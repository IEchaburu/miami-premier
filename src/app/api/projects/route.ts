import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import type { Prisma } from '@/generated/prisma/client'

interface ProjectsQueryParams {
	page?: string
	limit?: string
	filter?: string
	sort?: string
	state?: string
	country?: string
	search?: string
	type?: string
	featured?: string
	minPrice?: string
	maxPrice?: string
}

interface ProjectsResponse {
	projects: unknown[]
	pagination: {
		currentPage: number
		totalPages: number
		totalCount: number
		itemsPerPage: number
	}
	areaStats: Record<number, { count: number; avgPrice: number | null }>
	propertyTypes: string[]
}

export async function GET (request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams
		const params: ProjectsQueryParams = {
			page: searchParams.get('page') || undefined,
			limit: searchParams.get('limit') || undefined,
			filter: searchParams.get('filter') || undefined,
			sort: searchParams.get('sort') || undefined,
			state: searchParams.get('state') || undefined,
			country: searchParams.get('country') || undefined,
			search: searchParams.get('search') || undefined,
			type: searchParams.get('type') || undefined,
			featured: searchParams.get('featured') || undefined,
			minPrice: searchParams.get('minPrice') || undefined,
			maxPrice: searchParams.get('maxPrice') || undefined,
		}

		const currentPage = Number(params.page) || 1
		const itemsPerPage = Number(params.limit) || 6
		const filter = params.filter || 'all'
		const sort = params.sort || 'name-asc'
		const stateId = params.state ? Number(params.state) : null
		const countryCode = params.country || null

		// Fetch markets for country filtering
		const markets = await prisma.markets.findMany({
			select: {
				id: true,
				name: true,
				country: true,
				code: true,
			},
		})

		// Build where clause based on filter
		const whereClause: Prisma.projectsWhereInput = {
			is_published: true,
		}

		// Apply state filter (location) - filter by market_id
		if (stateId) {
			whereClause.market_id = stateId
		} else if (countryCode) {
			// If country code is selected but no specific state, filter by country
			// Find all market_ids that match this country code
			const countryMarkets = markets.filter(m => m.code === countryCode)
			if (countryMarkets.length > 0) {
				whereClause.market_id = {
					in: countryMarkets.map(m => m.id),
				}
			}
		}

		// Apply tag-based filters
		if (filter !== 'all') {
			whereClause.project_tags = {
				some: {
					tags: {
						name: {
							in: filter === 'beachfront'
								? ['Beachfront', 'Waterfront', 'Oceanfront']
								: filter === 'urban'
								? ['Urban', 'Downtown', 'City Center']
								: filter === 'luxury'
								? ['Luxury', 'Premium', 'High-End']
								: filter === 'family-friendly'
								? ['Family-Friendly', 'Family', 'Schools']
								: filter === 'arts-culture'
								? ['Arts & Culture', 'Cultural', 'Arts District']
								: [],
						},
					},
				},
			}
		}

		// Apply property type filter
		if (params.type && params.type !== 'all') {
			whereClause.property_type = params.type
		}

		// Apply search filter
		if (params.search) {
			whereClause.OR = [
				{ title: { contains: params.search, mode: 'insensitive' } },
				{ short_description: { contains: params.search, mode: 'insensitive' } },
			]
		}

		// Apply price range filter
		if (params.minPrice || params.maxPrice) {
			whereClause.price_usd = {}
			if (params.minPrice) {
				whereClause.price_usd.gte = Number(params.minPrice)
			}
			if (params.maxPrice) {
				whereClause.price_usd.lte = Number(params.maxPrice)
			}
		}

		// Apply featured filter
		if (params.featured === 'featured') {
			whereClause.featured_projects = {
				some: {},
			}
		} else if (params.featured === 'not-featured') {
			whereClause.featured_projects = {
				none: {},
			}
		}

		// Build orderBy clause
		let orderBy: Prisma.projectsOrderByWithRelationInput = {
			created_at: 'desc',
		}
		if (sort === 'name-asc') {
			orderBy = { title: 'asc' }
		} else if (sort === 'name-desc') {
			orderBy = { title: 'desc' }
		} else if (sort === 'price-asc') {
			orderBy = { price_usd: 'asc' }
		} else if (sort === 'price-desc') {
			orderBy = { price_usd: 'desc' }
		}

		// Get total count for pagination
		const totalCount = await prisma.projects.count({
			where: whereClause,
		})

		// Get projects with pagination
		const projects = await prisma.projects.findMany({
			where: whereClause,
			include: {
				markets: {
					select: {
						id: true,
						name: true,
						code: true,
						country: true,
					},
				},
				areas_barrios: {
					select: {
						id: true,
						name: true,
					},
				},
				project_media: {
					where: {
						kind: 'image',
					},
					orderBy: {
						sort_order: 'asc',
					},
					take: 1,
				},
				project_tags: {
					include: {
						tags: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
			orderBy,
			skip: (currentPage - 1) * itemsPerPage,
			take: itemsPerPage,
		})

		// Calculate development count and average price per area
		const areaStats = await prisma.projects.groupBy({
			by: ['area_id'],
			where: {
				is_published: true,
			},
			_count: {
				id: true,
			},
			_avg: {
				price_usd: true,
			},
		})

		const areaStatsMap = Object.fromEntries(
			areaStats.map(stat => [
				stat.area_id,
				{
					count: stat._count.id,
					avgPrice: stat._avg.price_usd,
				},
			])
		)

		const totalPages = Math.ceil(totalCount / itemsPerPage)

		// Get unique property types for filter
		const propertyTypes = await prisma.projects.findMany({
			where: {
				is_published: true,
				property_type: {
					not: null,
				},
			},
			select: {
				property_type: true,
			},
			distinct: ['property_type'],
		})

		const uniquePropertyTypes = propertyTypes
			.map(p => p.property_type)
			.filter((type): type is string => type !== null)
			.sort()

		const response: ProjectsResponse = {
			projects,
			pagination: {
				currentPage,
				totalPages,
				totalCount,
				itemsPerPage,
			},
			areaStats: areaStatsMap,
			propertyTypes: uniquePropertyTypes,
		}

		return NextResponse.json(response, { status: 200 })
	} catch (error) {
		console.error('Error fetching projects:', error)
		const errorMessage =
			error instanceof Error ? error.message : 'Failed to fetch projects'
		return NextResponse.json(
			{ error: errorMessage },
			{ status: 500 }
		)
	}
}
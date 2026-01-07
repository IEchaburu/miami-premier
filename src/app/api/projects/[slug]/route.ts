import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface ProjectDetailResponse {
	project: {
		id: number
		url: string | null
		title: string
		price_usd: number | null
		status: string | null
		property_type: string | null
		delivery_date: string | null
		address: string | null
		short_description: string | null
		description_md: string | null
		markets: {
			id: number
			name: string
			code: string
			country: string
		}
		areas_barrios: {
			id: number
			name: string
		}
		project_media: Array<{
			id: number
			s3_bucket: string | null
			s3_key: string | null
			alt: string | null
			title: string | null
			kind: string | null
			sort_order: number
		}>
		project_tags: Array<{
			tags: {
				id: number
				name: string
			}
		}>
		project_amenities: Array<{
			amenities: {
				id: number
				name: string
				icon: string | null
				kind: string | null
			}
		}>
	}
}

export async function GET (
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await params
		const projectId = Number(slug)

		// Try to find by ID first, then by URL slug
		const project = await prisma.projects.findFirst({
			where: {
				OR: [
					{ id: isNaN(projectId) ? -1 : projectId },
					{ url: slug },
				],
				is_published: true,
			},
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
					select: {
						id: true,
						s3_bucket: true,
						s3_key: true,
						alt: true,
						title: true,
						kind: true,
						sort_order: true,
					},
					orderBy: {
						sort_order: 'asc',
					},
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
				project_amenities: {
					include: {
						amenities: {
							select: {
								id: true,
								name: true,
								icon: true,
								kind: true,
							},
						},
					},
				},
			},
		})

		if (!project) {
			return NextResponse.json(
				{ error: 'Project not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ project }, { status: 200 })
	} catch (error) {
		console.error('Error fetching project:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch project' },
			{ status: 500 }
		)
	}
}


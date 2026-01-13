import { Suspense } from 'react'
import { getServerSession } from '@/lib/get-session'
import { Navbar } from '@/components/shared/navbar'
import { getImageUrl } from '@/lib/utils/image-url'
import { LocationFilter } from './components/location-filter'
import { AdvancedFilters } from './components/advanced-filters'
import { FiltersSort } from './components/filters-sort'
import { DevelopmentCard } from './components/development-card'
import { Pagination } from './components/pagination'

interface DevelopmentsPageProps {
	searchParams: Promise<{
		filter?: string
		sort?: string
		page?: string
		state?: string
		country?: string
		search?: string
		type?: string
		featured?: string
		minPrice?: string
		maxPrice?: string
		view?: string
	}>
}

export default async function DevelopmentsPage ({
	searchParams,
}: DevelopmentsPageProps) {
	const session = await getServerSession()
	const params = await searchParams
	const currentPage = Number(params.page) || 1
	const itemsPerPage = 6
	const filter = params.filter || 'all'
	const sort = params.sort || 'name-asc'
	const stateId = params.state ? Number(params.state) : null
	const countryCode = params.country || '1' // Default to United States (code 1)

	// Build API URL with query parameters
	const apiParams = new URLSearchParams()
	if (currentPage > 1) apiParams.set('page', currentPage.toString())
	apiParams.set('limit', itemsPerPage.toString())
	if (filter !== 'all') apiParams.set('filter', filter)
	if (sort !== 'name-asc') apiParams.set('sort', sort)
	if (stateId) apiParams.set('state', stateId.toString())
	if (countryCode) apiParams.set('country', countryCode)
	// Add search and other advanced filters
	if (params.search) apiParams.set('search', params.search)
	if (params.type && params.type !== 'all') apiParams.set('type', params.type)
	if (params.featured && params.featured !== 'all') {
		apiParams.set('featured', params.featured)
	}
	if (params.minPrice) apiParams.set('minPrice', params.minPrice)
	if (params.maxPrice) apiParams.set('maxPrice', params.maxPrice)

	// Fetch markets from API
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
	const marketsResponse = await fetch(`${baseUrl}/api/markets`, {
		cache: 'no-store',
	})
	const marketsData = await marketsResponse.json()
	const markets = marketsData.markets || []

	// Fetch projects from API
	const projectsResponse = await fetch(
		`${baseUrl}/api/projects?${apiParams.toString()}`,
		{
			cache: 'no-store',
		}
	)
	const projectsData = await projectsResponse.json()

	if (!projectsResponse.ok) {
		throw new Error(projectsData.error || 'Failed to fetch projects')
	}

	const projects = projectsData.projects || []
	const totalCount = projectsData.pagination?.totalCount || 0
	const totalPages = projectsData.pagination?.totalPages || 1
	const propertyTypes = projectsData.propertyTypes || []
	const areaStatsMap = new Map(
		Object.entries(projectsData.areaStats || {}).map(([key, value]: [string, any]) => [
			Number(key),
			value,
		])
	)

	// Get selected state name for header title
	const selectedState = stateId
		? markets.find((m: { id: number; name: string }) => m.id === stateId)
		: null
	const headerTitle = selectedState
		? `${selectedState.name} Developments`
		: 'All Featured Developments'

	return (
		<div className='min-h-screen bg-white dark:bg-zinc-950'>
			<Navbar isAuthenticated={!!session?.user} />
			<LocationFilter markets={markets} />
			<main className='mx-auto max-w-7xl px-6 py-10'>
				{/* Header */}
				<div className='mb-8 text-center'>
					<h1 className='text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
						{headerTitle}
					</h1>
					<p className='mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400'>
						{selectedState
							? `Discover ${selectedState.name}'s most desirable developments, each offering unique lifestyle experiences and investment opportunities.`
							: (() => {
								const selectedCountry =
									markets.find((m: { code: string }) => m.code === countryCode)?.country ||
									'this region'
								return `Discover ${selectedCountry}'s most desirable developments, each offering unique lifestyle experiences and investment opportunities.`
							  })()}
					</p>
				</div>

				{/* Advanced Filters */}
				{/*<AdvancedFilters propertyTypes={propertyTypes} />*/}

				{/* Filters and Sort */}
				<Suspense fallback={<div>Loading filters...</div>}>
					<FiltersSort totalCount={totalCount} showingCount={projects.length} />
				</Suspense>

				{/* Projects Grid */}
				{projects.length === 0 ? (
					<div className='rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900'>
						<p className='text-sm text-zinc-600 dark:text-zinc-400'>
							No developments available at the moment.
						</p>
					</div>
				) : (
					<>
						<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
							{projects.map((project: any) => {
								const stats = areaStatsMap.get(project.areas_barrios?.id || 0) as
									| { count: number; avgPrice: number | null }
									| undefined
								const imageUrl = project.project_media?.[0]
									? getImageUrl(project.project_media[0])
									: '/placeholder-image.jpg'

								return (
									<DevelopmentCard
										key={project.id}
										project={project}
										imageUrl={imageUrl}
										developmentCount={stats?.count || 1}
										averagePrice={stats?.avgPrice || undefined}
									/>
								)
							})}
						</div>

						{/* Pagination */}
						<Suspense fallback={null}>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
							/>
						</Suspense>
					</>
				)}
			</main>
		</div>
	)
}
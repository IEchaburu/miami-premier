'use client'

import { Search, Filter, Grid3x3, List, ChevronDown } from 'lucide-react'
import { useEffect } from 'react'
import { useFilterParams } from '@/hooks/use-filter-params'
import { useFilterStore } from '@/lib/stores/use-filter-store'

interface AdvancedFiltersProps {
	propertyTypes: string[]
}

export function AdvancedFilters ({ propertyTypes }: AdvancedFiltersProps) {
	const { getFilter, updateFilter } = useFilterParams()
	
	// Use Zustand store - Zustand setter functions are stable by design
	const searchInput = useFilterStore(state => state.searchInput)
	const isTyping = useFilterStore(state => state.isTyping)
	const setSearchInput = useFilterStore(state => state.setSearchInput)
	const setIsTyping = useFilterStore(state => state.setIsTyping)

	// Get current filter values from URL (source of truth)
	const currentType = getFilter('type', 'all')
	const currentFeatured = getFilter('featured', 'all')
	const currentView = getFilter('view', 'grid')
	const minPrice = getFilter('minPrice', '300000')
	const maxPrice = getFilter('maxPrice', '2000000')
	const urlSearch = getFilter('search', '')

	// Sync Zustand store with URL params - URL is the source of truth
	// This handles: initial mount, URL changes from other filters, browser navigation
	// Single useEffect to avoid dependency array size issues
	useEffect(() => {
		// Only sync if user is not currently typing
		// This prevents clearing user input while they're actively typing
		if (!isTyping) {
			// Always sync with URL - ensure search input reflects URL value
			setSearchInput(urlSearch)
		}
	}, [urlSearch, isTyping, setSearchInput])

	function handleSearch (e: React.FormEvent) {
		e.preventDefault()
		const trimmedSearch = searchInput.trim()
		setIsTyping(false)
		// Update URL - the useEffect will sync the store after URL updates
		// This ensures the input reflects the final URL value
		updateFilter('search', trimmedSearch || null)
	}

	function handleTypeChange (type: string) {
		updateFilter('type', type === 'all' ? null : type)
	}

	function handleFeaturedChange (featured: string) {
		updateFilter('featured', featured === 'all' ? null : featured)
	}

	function handleViewChange (view: string) {
		updateFilter('view', view, false) // Don't reset page for view changes
	}

	function handleMoreFilters () {
		// TODO: Open more filters modal/sheet
		console.log('More filters clicked')
	}

	function formatPrice (price: string) {
		return `$${Number(price).toLocaleString('en-US')}`
	}

	return (
		<div className='mb-6'>
			<div className='flex flex-wrap items-center gap-3'>
				{/* Search Bar */}
				<form
					onSubmit={handleSearch}
					className='flex-1 min-w-[200px] max-w-md'
				>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400' />
						<input
							type='search'
							value={searchInput}
							onChange={e => {
								setIsTyping(true)
								setSearchInput(e.target.value)
							}}
							onBlur={() => {
								setIsTyping(false)
								// Sync with URL after blur in case URL changed while typing
								if (searchInput !== urlSearch) {
									setSearchInput(urlSearch)
								}
							}}
							placeholder='Search developments'
							className='w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600'
						/>
					</div>
				</form>

				{/* All Types Dropdown */}
				<div className='relative'>
					<select
						value={currentType}
						onChange={e => handleTypeChange(e.target.value)}
						className='appearance-none rounded-lg border border-zinc-200 bg-white px-4 py-2.5 pr-8 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-600 dark:focus:border-zinc-600'
					>
						<option value='all'>All Types</option>
						{propertyTypes.map(type => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
					<ChevronDown className='pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500' />
				</div>

				{/* Price Range Display */}
				<div className='rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50'>
					{formatPrice(minPrice)} - {formatPrice(maxPrice)}
				</div>

				{/* More Filters Button */}
				<button
					type='button'
					onClick={handleMoreFilters}
					className='flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800'
				>
					<Filter className='h-4 w-4' />
					More Filters
				</button>

				{/* Featured Dropdown */}
				<div className='relative'>
					<select
						value={currentFeatured}
						onChange={e => handleFeaturedChange(e.target.value)}
						className='appearance-none rounded-lg border border-zinc-200 bg-white px-4 py-2.5 pr-8 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-600 dark:focus:border-zinc-600'
					>
						<option value='all'>Featured</option>
						<option value='featured'>Featured Only</option>
						<option value='not-featured'>Not Featured</option>
					</select>
					<ChevronDown className='pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500' />
				</div>

				{/* View Toggle */}
				<div className='flex items-center rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900'>
					<button
						type='button'
						onClick={() => handleViewChange('grid')}
						className={`flex items-center justify-center rounded p-1.5 transition ${
							currentView === 'grid'
								? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
								: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
						}`}
						aria-label='Grid view'
					>
						<Grid3x3 className='h-4 w-4' />
					</button>
					<button
						type='button'
						onClick={() => handleViewChange('list')}
						className={`flex items-center justify-center rounded p-1.5 transition ${
							currentView === 'list'
								? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
								: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
						}`}
						aria-label='List view'
					>
						<List className='h-4 w-4' />
					</button>
				</div>
			</div>
		</div>
	)
}


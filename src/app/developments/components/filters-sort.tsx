'use client'

import { ChevronDown } from 'lucide-react'
import { useFilterParams } from '@/hooks/use-filter-params'

interface FiltersSortProps {
	totalCount: number
	showingCount: number
}

const filterOptions = [
	{ id: 'all', label: 'All Developments' },
	{ id: 'beachfront', label: 'Beachfront' },
	{ id: 'urban', label: 'Urban' },
	{ id: 'luxury', label: 'Luxury' },
	{ id: 'family-friendly', label: 'Family-Friendly' },
	{ id: 'arts-culture', label: 'Arts & Culture' },
]

const sortOptions = [
	{ value: 'name-asc', label: 'Name A-Z' },
	{ value: 'name-desc', label: 'Name Z-A' },
	{ value: 'price-asc', label: 'Price: Low to High' },
	{ value: 'price-desc', label: 'Price: High to Low' },
	{ value: 'newest', label: 'Newest First' },
]

export function FiltersSort ({ totalCount, showingCount }: FiltersSortProps) {
	const { getFilter, updateFilter } = useFilterParams()
	const currentFilter = getFilter('filter', 'all')
	const currentSort = getFilter('sort', 'name-asc')

	function handleFilterChange (filterId: string) {
		updateFilter('filter', filterId === 'all' ? null : filterId)
	}

	function handleSortChange (sortValue: string) {
		updateFilter('sort', sortValue, false) // Don't reset page for sort changes
	}

	return (
		<div className='mb-6 space-y-4'>
			{/* Filter Buttons */}
			<div className='flex flex-wrap justify-center gap-2'>
				{filterOptions.map(filter => (
					<button
						key={filter.id}
						type='button'
						onClick={() => handleFilterChange(filter.id)}
						className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
							currentFilter === filter.id
								? 'bg-zinc-900 text-white shadow-md dark:bg-zinc-50 dark:text-zinc-900'
								: 'bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
						}`}
					>
						{filter.label}
					</button>
				))}
			</div>

			{/* Count and Sort */}
			<div className='flex items-center justify-between'>
				<p className='text-sm text-zinc-600 dark:text-zinc-400'>
					Showing {showingCount} of {totalCount} development
					{totalCount === 1 ? '' : 's'}
				</p>
				<div className='flex items-center gap-2'>
					<label
						htmlFor='sort'
						className='text-sm text-zinc-600 dark:text-zinc-400'
					>
						Sort by:
					</label>
					<div className='relative'>
						<select
							id='sort'
							value={currentSort}
							onChange={e => handleSortChange(e.target.value)}
							className='appearance-none rounded-lg border border-zinc-300 bg-white px-4 py-2 pr-8 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500'
						>
							{sortOptions.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						<ChevronDown className='pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500' />
					</div>
				</div>
			</div>
		</div>
	)
}


'use client'

import { ChevronDown } from 'lucide-react'
import { useFilterParams } from '@/hooks/use-filter-params'

interface Market {
	id: number
	name: string
	country: string
	code: string
}

interface LocationFilterProps {
	markets: Market[]
}

export function LocationFilter ({ markets }: LocationFilterProps) {
	const { getFilter, updateFilters } = useFilterParams()
	const currentState = getFilter('state', 'all')
	const currentCountry = getFilter('country', '1') // Default to United States (code 1)

	// Get unique countries from markets (grouped by country name)
	const countries = Array.from(
		new Map(
			markets.map(m => [
				m.country,
				{ id: m.id, name: m.country, code: m.code },
			])
		).values()
	)

	function handleStateChange (stateId: string) {
		updateFilters({
			state: stateId === 'all' ? null : stateId,
		})
	}

	function handleCountryChange (countryCode: string) {
		// Clear state when country changes
		updateFilters({
			country: countryCode,
			state: null,
		})
	}

	// Filter states (markets) based on selected country code
	// When a country code is selected, show only states (markets) that match that code
	const filteredStates = markets.filter(market => market.code === currentCountry)

	return (
		<div className='border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'>
			<div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4'>
				{/* Location Links - Show States (markets.name) */}
				<div className='flex flex-1 items-center gap-6 overflow-x-auto'>
					<button
						type='button'
						onClick={() => handleStateChange('all')}
						className={`whitespace-nowrap text-sm font-medium transition ${
							currentState === 'all'
								? 'text-teal-600 underline decoration-teal-600 underline-offset-4 dark:text-teal-400'
								: 'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100'
						}`}
					>
						All Developments
					</button>
					{filteredStates.map(state => (
						<button
							key={state.id}
							type='button'
							onClick={() => handleStateChange(state.id.toString())}
							className={`whitespace-nowrap text-sm font-medium transition ${
								currentState === state.id.toString()
									? 'text-teal-600 underline decoration-teal-600 underline-offset-4 dark:text-teal-400'
									: 'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100'
							}`}
						>
							{state.name}
						</button>
					))}
				</div>

				{/* Country Selector */}
				<div className='flex items-center gap-2'>
					<label
						htmlFor='country-select'
						className='whitespace-nowrap text-sm font-medium text-zinc-700 dark:text-zinc-300'
					>
						Select Country:
					</label>
					<div className='relative'>
						<select
							id='country-select'
							value={currentCountry}
							onChange={e => handleCountryChange(e.target.value)}
							className='appearance-none rounded-lg border border-zinc-300 bg-white px-4 py-2 pr-8 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500'
						>
							{countries.map(country => (
								<option key={country.id} value={country.code}>
									{country.name}
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


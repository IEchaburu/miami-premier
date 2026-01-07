'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useFilterStore } from '@/lib/stores/use-filter-store'

/**
 * Custom hook to manage filter URL parameters
 * 
 * This hook provides a clean interface for reading and updating filter params
 * while maintaining URL params as the source of truth for SEO.
 */
export function useFilterParams () {
	const searchParams = useSearchParams()
	const router = useRouter()

	/**
	 * Get a filter value from URL params with optional default
	 */
	const getFilter = useCallback(
		(key: string, defaultValue: string = '') => {
			return searchParams.get(key) || defaultValue
		},
		[searchParams]
	)

	/**
	 * Update a single filter param in the URL
	 */
	const updateFilter = useCallback(
		(key: string, value: string | null, resetPage: boolean = true) => {
			const params = new URLSearchParams(searchParams.toString())

			if (value === null || value === '' || value === 'all') {
				params.delete(key)
			} else {
				params.set(key, value)
			}

			if (resetPage) {
				params.set('page', '1')
			}

			router.push(`/developments?${params.toString()}`)
		},
		[searchParams, router]
	)

	/**
	 * Update multiple filter params at once
	 */
	const updateFilters = useCallback(
		(
			updates: Record<string, string | null>,
			resetPage: boolean = true
		) => {
			const params = new URLSearchParams(searchParams.toString())

			Object.entries(updates).forEach(([key, value]) => {
				if (value === null || value === '' || value === 'all') {
					params.delete(key)
				} else {
					params.set(key, value)
				}
			})

			if (resetPage) {
				params.set('page', '1')
			}

			router.push(`/developments?${params.toString()}`)
		},
		[searchParams, router]
	)

	/**
	 * Get all current filter values as an object
	 */
	const getAllFilters = useCallback(() => {
		return {
			filter: getFilter('filter', 'all'),
			sort: getFilter('sort', 'name-asc'),
			state: getFilter('state', 'all'),
			country: getFilter('country', '1'),
			search: getFilter('search', ''),
			type: getFilter('type', 'all'),
			featured: getFilter('featured', 'all'),
			view: getFilter('view', 'grid'),
			minPrice: getFilter('minPrice', '300000'),
			maxPrice: getFilter('maxPrice', '2000000'),
			page: getFilter('page', '1'),
		}
	}, [getFilter])

	return {
		getFilter,
		updateFilter,
		updateFilters,
		getAllFilters,
		searchParams,
	}
}


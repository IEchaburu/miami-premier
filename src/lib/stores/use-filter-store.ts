import { create } from 'zustand'

/**
 * Filter UI State Store
 * 
 * This store manages temporary UI state for filters (e.g., search input while typing).
 * URL params remain the source of truth for actual filter values (for SEO).
 */
interface FilterUIState {
	// Temporary UI state (not synced to URL until submitted)
	searchInput: string
	isTyping: boolean

	// Actions
	setSearchInput: (value: string) => void
	setIsTyping: (value: boolean) => void
	resetSearchInput: () => void
}

export const useFilterStore = create<FilterUIState>(set => ({
	searchInput: '',
	isTyping: false,

	setSearchInput: (value: string) => set({ searchInput: value }),
	setIsTyping: (value: boolean) => set({ isTyping: value }),
	resetSearchInput: () => set({ searchInput: '', isTyping: false }),
}))


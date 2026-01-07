'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
	currentPage: number
	totalPages: number
}

export function Pagination ({ currentPage, totalPages }: PaginationProps) {
	const searchParams = useSearchParams()

	function createPageUrl (page: number) {
		const params = new URLSearchParams(searchParams.toString())
		params.set('page', page.toString())
		return `/developments?${params.toString()}`
	}

	if (totalPages <= 1) return null

	return (
		<div className='mt-8 flex items-center justify-center gap-2'>
			{currentPage > 1 ? (
				<Link
					href={createPageUrl(currentPage - 1)}
					className='flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
				>
					<ChevronLeft className='h-4 w-4' />
					Previous
				</Link>
			) : (
				<div className='flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-300 dark:border-zinc-700 dark:bg-zinc-900'>
					<ChevronLeft className='h-4 w-4' />
					Previous
				</div>
			)}

			<div className='flex items-center gap-1'>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
					<Link
						key={page}
						href={createPageUrl(page)}
						className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition ${
							page === currentPage
								? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
								: 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
						}`}
					>
						{page}
					</Link>
				))}
			</div>

			{currentPage < totalPages ? (
				<Link
					href={createPageUrl(currentPage + 1)}
					className='flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
				>
					Next
					<ChevronRight className='h-4 w-4' />
				</Link>
			) : (
				<div className='flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-300 dark:border-zinc-700 dark:bg-zinc-900'>
					Next
					<ChevronRight className='h-4 w-4' />
				</div>
			)}
		</div>
	)
}


'use client'

import { MapPin, Heart, Share2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ProjectDetailsProps {
	project: {
		id: number
		title: string
		price_usd: number | null
		status: string | null
		delivery_date: string | null
		markets: {
			name: string
		}
		areas_barrios: {
			name: string
		} | null
	}
	isAuthenticated: boolean
}

export function ProjectDetails ({
	project,
	isAuthenticated,
}: ProjectDetailsProps) {
	const router = useRouter()
	const [isFavorited, setIsFavorited] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Fetch favorite status on mount
	useEffect(() => {
		async function checkFavoriteStatus () {
			if (!isAuthenticated) {
				return
			}

			try {
				const response = await fetch(`/api/favorites/${project.id}`)
				if (response.ok) {
					const data = await response.json()
					setIsFavorited(data.isFavorited)
				}
			} catch (err) {
				console.error('Error checking favorite status:', err)
			}
		}

		checkFavoriteStatus()
	}, [project.id, isAuthenticated])

	function formatPrice (price: number | null) {
		if (!price) return 'Price on request'
		return `$${price.toLocaleString('en-US')}`
	}

	async function handleFavorite () {
		if (!isAuthenticated) {
			// Redirect to login with return URL
			const currentPath = window.location.pathname
			router.push(`/sign-in?returnUrl=${encodeURIComponent(currentPath)}`)
			return
		}

		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch(`/api/favorites/${project.id}`, {
				method: 'POST',
			})

			if (response.status === 401) {
				// User is not authenticated, redirect to login
				const currentPath = window.location.pathname
				router.push(`/sign-in?returnUrl=${encodeURIComponent(currentPath)}`)
				return
			}

			if (!response.ok) {
				const data = await response.json()
				throw new Error(data.error || 'Failed to update favorite')
			}

			const data = await response.json()
			setIsFavorited(data.isFavorited)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to update favorite')
			console.error('Error toggling favorite:', err)
		} finally {
			setIsLoading(false)
		}
	}

	function handleShare () {
		if (navigator.share) {
			navigator.share({
				title: project.title,
				url: window.location.href,
			})
		} else {
			// Fallback: Copy to clipboard
			navigator.clipboard.writeText(window.location.href)
			// TODO: Show toast notification
		}
	}

	return (
		<div className='space-y-6'>
			{/* Title */}
			<h1 className='text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl'>
				{project.title}
			</h1>

			{/* Location */}
			<div className='flex items-center gap-2 text-zinc-600'>
				<MapPin className='h-4 w-4' />
				<span className='text-sm'>
					{project.areas_barrios?.name || ''}
					{project.areas_barrios?.name && project.markets.name && ', '}
					{project.markets.name}
				</span>
			</div>

			{/* Price */}
			<div>
				<p className='text-sm text-zinc-600'>Price from</p>
				<p className='text-3xl font-bold text-zinc-900 sm:text-4xl'>
					{formatPrice(project.price_usd)}
				</p>
			</div>

			{/* Delivery Date */}
			{project.delivery_date && (
				<div>
					<p className='text-sm text-zinc-600'>Estimated delivery</p>
					<p className='text-lg font-medium text-zinc-900'>
						{project.delivery_date}
					</p>
				</div>
			)}

			{/* Status Tag */}
			{project.status && (
				<div>
					<span className='inline-flex rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white'>
						{project.status}
					</span>
				</div>
			)}

			{/* Divider */}
			<div className='border-t border-zinc-200' />

			{/* Error Message */}
			{error && (
				<div className='rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200'>
					{error}
				</div>
			)}

			{/* Action Buttons */}
			<div className='flex flex-col gap-3 sm:flex-row'>
				<button
					type='button'
					onClick={handleFavorite}
					disabled={isLoading}
					className='flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed'
				>
					<Heart
						className={`h-4 w-4 ${
							isFavorited ? 'fill-red-500 text-red-500' : ''
						}`}
					/>
					{isLoading ? 'Loading...' : 'Favorites'}
				</button>
				<button
					type='button'
					onClick={handleShare}
					className='flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50'
				>
					<Share2 className='h-4 w-4' />
					Share
				</button>
			</div>
		</div>
	)
}


'use client'

import { Building2, MapPin, Calendar, DollarSign, Heart, Share2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface DevelopmentInfoProps {
	project: {
		id: number
		title: string
		price_usd: number | null
		status: string | null
		delivery_date: string | null
		total_units?: number | null
		floors?: number | null
		description_md?: string | null
		short_description?: string | null
		markets: {
			name: string
		}
		areas_barrios: {
			name: string
		} | null
	}
	isAuthenticated: boolean
}

export function DevelopmentInfo ({ project, isAuthenticated }: DevelopmentInfoProps) {
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
			navigator.clipboard.writeText(window.location.href)
		}
	}

	const locationText = [
		project.areas_barrios?.name,
		project.markets.name,
	]
		.filter(Boolean)
		.join(', ')

	const stats = [
		{
			icon: DollarSign,
			label: 'Starting from',
			value: formatPrice(project.price_usd),
		},
		{
			icon: Building2,
			label: 'Total Residences',
			value: project.total_units?.toString() || 'N/A',
		},
		{
			icon: MapPin,
			label: 'Floors',
			value: project.floors?.toString() || 'N/A',
		},
		{
			icon: Calendar,
			label: 'Completion',
			value: project.delivery_date || 'TBD',
		},
	]

	return (
		<section className='bg-white px-8 py-24 md:px-16 lg:px-24'>
			<div className='mx-auto max-w-7xl'>
				{/* Stats Grid */}
				<div className='mb-20 grid grid-cols-2 gap-8 border-b border-neutral-200 pb-12 md:grid-cols-4'>
					{stats.map((stat, index) => (
						<div key={index} className='border-l-2 border-neutral-900 pl-6'>
							<stat.icon className='mb-3 h-6 w-6 text-neutral-600' />
							<div className='mb-1 text-sm uppercase tracking-wider text-neutral-500'>
								{stat.label}
							</div>
							<div className='text-2xl font-semibold text-neutral-900'>{stat.value}</div>
						</div>
					))}
				</div>

				{/* Action Buttons */}
				<div className='mb-20 flex flex-col gap-3 sm:flex-row'>
					<button
						type='button'
						onClick={handleFavorite}
						disabled={isLoading}
						className='flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed'
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
						className='flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50'
					>
						<Share2 className='h-4 w-4' />
						Share
					</button>
				</div>

				{/* Error Message */}
				{error && (
					<div className='mb-8 rounded-lg bg-red-50 p-3 text-sm text-red-800'>
						{error}
					</div>
				)}

				{/* Description and Features */}
				{(project.description_md || project.short_description) && (
					<div className='grid gap-16 lg:grid-cols-2'>
						<div>
							<h2 className='mb-6 text-4xl font-bold tracking-tight text-neutral-900'>
								A New Standard of Excellence
							</h2>
							<p className='leading-relaxed text-neutral-600'>
								{project.description_md || project.short_description}
							</p>
						</div>

						<div>
							<h3 className='mb-6 text-2xl font-semibold tracking-tight text-neutral-900'>
								Distinctive Features
							</h3>
							<ul className='space-y-4'>
								<li className='flex items-start gap-3'>
									<div className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900' />
									<span className='text-neutral-600'>
										Premium location in {locationText}
									</span>
								</li>
								{project.status && (
									<li className='flex items-start gap-3'>
										<div className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900' />
										<span className='text-neutral-600'>Status: {project.status}</span>
									</li>
								)}
								{project.floors && (
									<li className='flex items-start gap-3'>
										<div className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900' />
										<span className='text-neutral-600'>
											{project.floors} floors of luxury living
										</span>
									</li>
								)}
								{project.total_units && (
									<li className='flex items-start gap-3'>
										<div className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900' />
										<span className='text-neutral-600'>
											{project.total_units} exclusive residences
										</span>
									</li>
								)}
							</ul>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}


'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MapPin, ArrowRight } from 'lucide-react'

interface DevelopmentCardProps {
	project: {
		id: number
		url: string | null
		title: string
		price_usd: number | null
		status: string | null
		areas_barrios: {
			name: string
		} | null
		markets: {
			name: string
		} | null
		project_media: Array<{
			s3_bucket: string | null
			s3_key: string | null
			alt: string | null
		}>
		project_tags: Array<{
			tags: {
				name: string
			}
		}>
	}
	imageUrl: string
	developmentCount?: number
	averagePrice?: number
}

export function DevelopmentCard ({
	project,
	imageUrl,
	developmentCount = 1,
	averagePrice,
}: DevelopmentCardProps) {
	const router = useRouter()
	const tags = project.project_tags.slice(0, 3).map(pt => pt.tags.name)
	const locationText = project.areas_barrios?.name || project.markets?.name || ''

	function handleExplore (e: React.MouseEvent) {
		e.preventDefault()
		router.push(`/developments/${project.url ?? project.id}`)
	}

	function handleContact (e: React.MouseEvent) {
		e.preventDefault()
		// TODO: Open contact modal or navigate to contact form
	}

	return (
		<article className='group relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg dark:bg-zinc-900'>
			{/* Image Container with Overlay */}
			<Link href={`/developments/${project.url ?? project.id}`}>
				<div className='relative h-80 overflow-hidden'>
					{/* Image with color grading filters */}
					<div className='relative h-full w-full'>
						<img
							src={imageUrl}
							alt={project.project_media[0]?.alt ?? project.title}
							className='h-full w-full object-cover transition duration-500 group-hover:scale-110'
							style={{
								filter: 'brightness(0.95) contrast(1.05) saturate(1.1)',
							}}
						/>
						{/* Color grading overlay - enhances image depth */}
						<div className='absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-orange-900/5' />
					</div>

					{/* Price Tag Overlay - Top Right */}
					{project.price_usd && (
						<div className='absolute right-4 top-4 rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-lg'>
							From ${(project.price_usd / 1000).toFixed(0)}K
						</div>
					)}

					{/* Enhanced Gradient Overlay for Text Readability with color grading */}
					<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />
					<div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20' />

					{/* Content Overlay */}
					<div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
						{/* Location Icon and Text */}
						<div className='mb-2 flex items-center gap-1.5 text-sm font-medium text-white/90'>
							<MapPin className='h-4 w-4' />
							<span>{locationText}</span>
						</div>

						{/* Project Title - Larger, bolder */}
						<h3 className='mb-3 text-3xl font-bold leading-tight tracking-tight'>
							{project.title}
						</h3>

						{/* Development Count and Average Price */}
						<div className='mb-3 flex items-center gap-4 text-sm font-medium text-white/90'>
							<span>
								{developmentCount} Development{developmentCount === 1 ? '' : 's'}
							</span>
							{averagePrice && (
								<span>Avg: ${(averagePrice / 1000).toFixed(0)}K</span>
							)}
						</div>

						{/* Feature Tags */}
						{tags.length > 0 && (
							<div className='mb-4 flex flex-wrap gap-2'>
								{tags.map(tag => (
									<span
										key={tag}
										className='rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm'
									>
										{tag}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
			</Link>

			{/* Action Buttons */}
			<div className='flex gap-2 p-4'>
				<button
					type='button'
					onClick={handleExplore}
					className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
				>
					Explore
					<ArrowRight className='h-4 w-4' />
				</button>
				<button
					type='button'
					onClick={handleContact}
					className='flex flex-1 items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
				>
					Contact
				</button>
			</div>
		</article>
	)
}


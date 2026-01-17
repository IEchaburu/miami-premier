'use client'

import { ChevronDown } from 'lucide-react'
import { getImageUrl } from '@/lib/utils/image-url'

interface HeroSectionProps {
	image: {
		id: number
		s3_bucket: string | null
		s3_key: string | null
		alt: string | null
		sort_order: number
	}
	title: string
	tagline?: string | null
	location: string
}

export function HeroSection ({ image, title, tagline, location }: HeroSectionProps) {
	const imageUrl = getImageUrl(image)

	return (
		<div className='relative h-[calc(100vh-4rem)] w-full overflow-hidden'>
			{/* Background Image */}
			<div className='absolute inset-0'>
				<img
					src={imageUrl}
					alt={image.alt || title}
					className='h-full w-full object-cover'
					loading='eager'
				/>
				{/* Gradient Overlay */}
				<div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60' />
			</div>

			{/* Hero Content */}
			<div className='absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center text-white'>
				<div className='mb-4 text-sm tracking-[0.3em] text-white/80 uppercase'>
					{location}
				</div>
				<h1 className='mb-6 text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl'>
					{title}
				</h1>
				{tagline && (
					<p className='max-w-2xl text-xl tracking-wide text-white/90 md:text-2xl'>
						{tagline}
					</p>
				)}
			</div>
		</div>
	)
}


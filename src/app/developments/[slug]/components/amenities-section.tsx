'use client'

import {
	Waves,
	Dumbbell,
	Car,
	Shield,
	Wifi,
	Coffee,
	UtensilsCrossed,
	BookOpen,
	Monitor,
	Gamepad2,
	Umbrella,
	Sparkles,
} from 'lucide-react'

// Fallback icon mapping - only used if database doesn't provide an icon
// This is a fallback, database icon takes priority
const AMENITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
	pool: Waves,
	pools: Waves,
	gym: Dumbbell,
	fitness: Dumbbell,
	parking: Car,
	valet: Car,
	security: Shield,
	business: Wifi,
	center: Wifi,
	lounge: Coffee,
	spa: Sparkles,
	beach: Umbrella,
	dining: UtensilsCrossed,
	breakfast: UtensilsCrossed,
	library: BookOpen,
	media: Monitor,
	game: Gamepad2,
	simulator: Gamepad2,
}

interface AmenitiesSectionProps {
	amenities: Array<{
		amenities: {
			id: number
			name: string
			icon: string | null
			kind: string | null
		}
	}>
}

export function AmenitiesSection ({ amenities }: AmenitiesSectionProps) {
	if (!amenities || amenities.length === 0) {
		return null
	}

	// Helper function to render icon - prioritizes database icon, falls back to name-based matching
	function renderIcon (icon: string | null, name: string, kind: string | null) {
		// Priority 1: Use icon from database if provided
		if (icon) {
			// If it's an SVG string, render it directly
			if (icon.startsWith('<svg') || icon.startsWith('data:image/svg')) {
				return (
					<div
						className='h-6 w-6 text-zinc-900'
						dangerouslySetInnerHTML={{ __html: icon }}
					/>
				)
			}
			// If it's a URL, use it as an image source
			if (icon.startsWith('http') || icon.startsWith('/')) {
				return (
					<img
						src={icon}
						alt={name}
						className='h-6 w-6 object-contain'
					/>
				)
			}
		}

		// Priority 2: Try to match icon based on kind (from database)
		if (kind) {
			const kindLower = kind.toLowerCase()
			const IconComponent = Object.entries(AMENITY_ICONS).find(([key]) =>
				kindLower.includes(key)
			)?.[1]

			if (IconComponent) {
				return <IconComponent className='h-6 w-6 text-zinc-900' />
			}
		}

		// Priority 3: Try to match icon based on name
		const nameLower = name.toLowerCase()
		const IconComponent = Object.entries(AMENITY_ICONS).find(([key]) =>
			nameLower.includes(key)
		)?.[1]

		if (IconComponent) {
			return <IconComponent className='h-6 w-6 text-zinc-900' />
		}

		// Default: Show first letter
		return (
			<div className='flex h-6 w-6 items-center justify-center rounded bg-zinc-100 text-xs font-semibold text-zinc-600'>
				{name.charAt(0).toUpperCase()}
			</div>
		)
	}

	return (
		<div className='mt-8 border-t border-zinc-200 pt-8 sm:mt-12 sm:pt-12'>
			<h2 className='mb-6 text-xl font-semibold text-zinc-900 sm:mb-8 sm:text-2xl'>
				Amenities
			</h2>
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6'>
				{amenities.map(({ amenities: amenity }) => {
					return (
						<div
							key={amenity.id}
							className='flex items-start gap-4 rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 hover:shadow-sm sm:p-5'
						>
							{/* Icon - from database */}
							<div className='shrink-0'>
								{renderIcon(amenity.icon, amenity.name, amenity.kind)}
							</div>

							{/* Content - from database */}
							<div className='flex-1'>
								<h3 className='mb-1 text-base font-semibold text-zinc-900 sm:text-lg'>
									{amenity.name}
								</h3>
								{/* Show kind as description if available */}
								{amenity.kind && (
									<p className='text-sm text-zinc-600 sm:text-base'>
										{amenity.kind}
									</p>
								)}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}


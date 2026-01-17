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
	Users,
	Wine,
	Palmtree,
} from 'lucide-react'
import { getImageUrl } from '@/lib/utils/image-url'

// Fallback icon mapping - only used if database doesn't provide an icon
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
	wine: Wine,
	users: Users,
	cinema: Users,
	terrace: Palmtree,
	garden: Palmtree,
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
	featureImage?: {
		id: number
		s3_bucket: string | null
		s3_key: string | null
		alt: string | null
		sort_order: number
	} | null
}

export function AmenitiesSection ({ amenities, featureImage }: AmenitiesSectionProps) {
	if (!amenities || amenities.length === 0) {
		return null
	}

	// Helper function to render icon
	function renderIcon (icon: string | null, name: string, kind: string | null) {
		if (icon) {
			if (icon.startsWith('<svg') || icon.startsWith('data:image/svg')) {
				return (
					<div
						className='h-8 w-8 text-neutral-900'
						dangerouslySetInnerHTML={{ __html: icon }}
					/>
				)
			}
			if (icon.startsWith('http') || icon.startsWith('/')) {
				return <img src={icon} alt={name} className='h-8 w-8 object-contain' />
			}
		}

		if (kind) {
			const kindLower = kind.toLowerCase()
			const IconComponent = Object.entries(AMENITY_ICONS).find(([key]) =>
				kindLower.includes(key)
			)?.[1]

			if (IconComponent) {
				return <IconComponent className='h-8 w-8 text-neutral-900' />
			}
		}

		const nameLower = name.toLowerCase()
		const IconComponent = Object.entries(AMENITY_ICONS).find(([key]) =>
			nameLower.includes(key)
		)?.[1]

		if (IconComponent) {
			return <IconComponent className='h-8 w-8 text-neutral-900' />
		}

		return (
			<div className='flex h-8 w-8 items-center justify-center rounded bg-neutral-100 text-xs font-semibold text-neutral-600'>
				{name.charAt(0).toUpperCase()}
			</div>
		)
	}

	return (
		<section className='bg-neutral-50 px-8 py-24 md:px-16 lg:px-24'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-16 text-center'>
					<h2 className='mb-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl'>
						World-Class Amenities
					</h2>
					<p className='text-lg text-neutral-600'>
						Every detail curated for an exceptional lifestyle
					</p>
				</div>

				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
					{amenities.map(({ amenities: amenity }) => (
						<div key={amenity.id} className='group'>
							<div className='mb-4 flex h-16 w-16 items-center justify-center border-2 border-neutral-900 transition group-hover:bg-neutral-900'>
								<div className='transition group-hover:text-white'>
									{renderIcon(amenity.icon, amenity.name, amenity.kind)}
								</div>
							</div>
							<h3 className='mb-2 text-xl font-semibold text-neutral-900'>
								{amenity.name}
							</h3>
							{amenity.kind && (
								<p className='text-neutral-600'>{amenity.kind}</p>
							)}
						</div>
					))}
				</div>

				{/* Feature Image */}
				{featureImage && (
					<div className='mt-20'>
						<div className='relative h-[500px] overflow-hidden'>
							<img
								src={getImageUrl(featureImage)}
								alt={featureImage.alt || 'Amenities'}
								className='h-full w-full object-cover'
								loading='lazy'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
							<div className='absolute bottom-0 left-0 p-12 text-white'>
								<h3 className='mb-2 text-3xl font-bold'>Elevated Living Experience</h3>
								<p className='max-w-2xl text-lg text-white/90'>
									From sunrise yoga sessions to sunset cocktails by the pool, every moment
									is designed to inspire.
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}


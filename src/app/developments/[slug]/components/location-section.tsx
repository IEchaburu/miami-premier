'use client'

import { MapPin, Compass } from 'lucide-react'

interface LocationSectionProps {
	location: string
	address?: string | null
	latitude?: number | null
	longitude?: number | null
}

export function LocationSection ({
	location,
	address,
	latitude,
	longitude,
}: LocationSectionProps) {
	function handleGetDirections () {
		if (latitude && longitude) {
			window.open(
				`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
				'_blank'
			)
		} else if (address) {
			window.open(
				`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
				'_blank'
			)
		} else {
			window.open(
				`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
				'_blank'
			)
		}
	}

	// Build the map query string for Google Maps Embed API
	function getMapQuery (): string {
		if (latitude && longitude) {
			return `${latitude},${longitude}`
		}
		if (address) {
			return encodeURIComponent(address)
		}
		return encodeURIComponent(location)
	}

	const mapQuery = getMapQuery()
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
	const mapUrl = apiKey
		? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${mapQuery}&zoom=15`
		: null

	return (
		<section className='bg-white px-8 py-24 md:px-16 lg:px-24'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-16 text-center'>
					<h2 className='mb-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl'>
						Prime Location
					</h2>
					<p className='text-lg text-neutral-600'>
						At the heart of the most prestigious district
					</p>
				</div>

				<div className='grid gap-12 lg:grid-cols-2'>
					{/* Google Maps Embed */}
					<div className='relative aspect-square w-full overflow-hidden rounded-lg border border-neutral-200'>
						{mapUrl ? (
							<iframe
								width='100%'
								height='100%'
								style={{ border: 0 }}
								loading='lazy'
								allowFullScreen
								referrerPolicy='no-referrer-when-downgrade'
								src={mapUrl}
								title={`Map showing ${location}`}
							/>
						) : (
							<div className='absolute inset-0 flex items-center justify-center bg-neutral-100'>
								<div className='text-center text-neutral-600'>
									<MapPin className='mx-auto mb-4 h-16 w-16 text-neutral-400' />
									<p className='text-xl font-medium'>{location}</p>
									{address && <p className='mt-2 text-sm text-neutral-500'>{address}</p>}
									<p className='mt-4 text-xs text-neutral-400'>
										Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable map
									</p>
								</div>
							</div>
						)}
					</div>

					{/* Neighborhood Info */}
					<div>
						<div className='mb-8'>
							<div className='mb-4 flex items-center gap-3'>
								<Compass className='h-6 w-6 text-neutral-900' />
								<h3 className='text-2xl font-semibold text-neutral-900'>
									Neighborhood
								</h3>
							</div>
							<p className='text-neutral-600'>
								Situated in a vibrant area, this development offers unparalleled access to
								world-class dining, shopping, and entertainment. Experience the perfect
								balance of urban sophistication and tranquility.
							</p>
						</div>

						<button
							type='button'
							onClick={handleGetDirections}
							className='mt-8 flex items-center gap-2 border-b border-neutral-900 pb-1 font-medium text-neutral-900 transition hover:text-neutral-600'
						>
							<MapPin className='h-4 w-4' />
							Get Directions
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}


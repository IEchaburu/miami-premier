'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { getImageUrl } from '@/lib/utils/image-url'

interface GallerySectionProps {
	images: Array<{
		id: number
		s3_bucket: string | null
		s3_key: string | null
		alt: string | null
		title: string | null
		sort_order: number
	}>
	title: string
}

export function GallerySection ({ images, title }: GallerySectionProps) {
	const [selectedImage, setSelectedImage] = useState<number | null>(null)

	if (!images || images.length === 0) {
		return null
	}

	// Limit to 6 images for the grid
	const displayImages = images.slice(0, 6)

	return (
		<section className='bg-neutral-900 px-8 py-24 md:px-16 lg:px-24'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-16 text-center'>
					<h2 className='mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl'>
						Visual Journey
					</h2>
					<p className='text-lg text-neutral-400'>
						Explore every detail of refined living
					</p>
				</div>

				{/* Gallery Grid */}
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{displayImages.map((image, index) => {
						const imageUrl = getImageUrl(image)
						return (
							<div
								key={image.id}
								className='group relative aspect-[4/3] cursor-pointer overflow-hidden'
								onClick={() => setSelectedImage(index)}
							>
								<img
									src={imageUrl}
									alt={image.alt || image.title || `${title} - Image ${index + 1}`}
									className='h-full w-full object-cover transition duration-700 group-hover:scale-110'
									loading='lazy'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100'>
									<div className='absolute bottom-0 left-0 p-6'>
										<p className='text-lg text-white'>
											{image.title || image.alt || `Image ${index + 1}`}
										</p>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>

			{/* Lightbox Modal */}
			{selectedImage !== null && (
				<div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4'
					onClick={() => setSelectedImage(null)}
				>
					<button
						type='button'
						className='absolute right-8 top-8 text-white transition hover:text-neutral-400'
						onClick={() => setSelectedImage(null)}
						aria-label='Close lightbox'
					>
						<X className='h-8 w-8' />
					</button>
					<img
						src={getImageUrl(displayImages[selectedImage])}
						alt={
							displayImages[selectedImage].alt ||
							displayImages[selectedImage].title ||
							`${title} - Image ${selectedImage + 1}`
						}
						className='max-h-[90vh] max-w-[90vw] object-contain'
						onClick={e => e.stopPropagation()}
					/>
				</div>
			)}
		</section>
	)
}


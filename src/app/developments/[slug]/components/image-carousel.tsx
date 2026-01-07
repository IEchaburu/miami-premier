'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { getImageUrl } from '@/lib/utils/image-url'

interface ImageCarouselProps {
	images: Array<{
		id: number
		s3_bucket: string | null
		s3_key: string | null
		alt: string | null
		sort_order: number
	}>
	title: string
}

const MAX_VISIBLE_THUMBNAILS = 5

export function ImageCarousel ({ images, title }: ImageCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isZoomed, setIsZoomed] = useState(false)

	if (images.length === 0) {
		return (
			<div className='relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-100'>
				<div className='flex h-full items-center justify-center text-zinc-400'>
					No images available
				</div>
			</div>
		)
	}

	const currentImage = images[currentIndex]
	const imageUrl = getImageUrl(currentImage)

	function handlePrevious () {
		setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
	}

	function handleNext () {
		setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
	}

	function handleThumbnailClick (index: number) {
		setCurrentIndex(index)
	}

	// No need to scroll since we only show 5 thumbnails

	return (
		<div className='w-full space-y-4'>
			{/* Main Image */}
			<div className='relative w-full overflow-hidden rounded-lg bg-zinc-100 shadow-sm'>
				<div className='relative aspect-[4/3] w-full'>
					<img
						src={imageUrl}
						alt={currentImage.alt || title}
						className='h-full w-full object-cover'
						loading='eager'
					/>
				</div>

				{/* Image Counter */}
				{images.length > 1 && (
					<div className='absolute left-2 top-2 rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-sm'>
						{currentIndex + 1}/{images.length}
					</div>
				)}

				{/* Zoom Button */}
				<button
					type='button'
					onClick={() => setIsZoomed(!isZoomed)}
					className='absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:right-4 sm:top-4 sm:h-10 sm:w-10'
					aria-label='Zoom image'
				>
					<ZoomIn className='h-4 w-4 sm:h-5 sm:w-5' />
				</button>

				{/* Navigation Arrows */}
				{images.length > 1 && (
					<>
						<button
							type='button'
							onClick={handlePrevious}
							className='absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:left-4 sm:h-10 sm:w-10'
							aria-label='Previous image'
						>
							<ChevronLeft className='h-4 w-4 sm:h-5 sm:w-5' />
						</button>
						<button
							type='button'
							onClick={handleNext}
							className='absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:right-4 sm:h-10 sm:w-10'
							aria-label='Next image'
						>
							<ChevronRight className='h-4 w-4 sm:h-5 sm:w-5' />
						</button>
					</>
				)}
			</div>

			{/* Horizontal Thumbnail Carousel - Only shows first 5 thumbnails */}
			{images.length > 1 && (
				<div className='relative w-full'>
					<div className='flex w-full gap-2.5'>
						{/* Show only first 5 thumbnails, or all if less than 5 */}
						{images.slice(0, MAX_VISIBLE_THUMBNAILS).map((image, index) => {
							const thumbUrl = getImageUrl(image)
							const isActive = currentIndex === index
							const remainingCount = images.length - MAX_VISIBLE_THUMBNAILS
							// Show +X on the last visible thumbnail (5th) if there are more than 5 images
							const isLastVisible = index === MAX_VISIBLE_THUMBNAILS - 1
							const showRemainingCount =
								isLastVisible && images.length > MAX_VISIBLE_THUMBNAILS

							return (
								<button
									key={`thumbnail-${image.id}-${index}`}
									type='button'
									onClick={() => handleThumbnailClick(index)}
									className={`relative flex-1 overflow-hidden rounded-lg border-2 transition-all ${
										isActive
											? 'border-zinc-900 ring-2 ring-zinc-900 ring-offset-2'
											: 'border-zinc-200 hover:border-zinc-400'
									}`}
									aria-label={`View image ${index + 1}`}
								>
									<div className='aspect-square w-full'>
										<img
											src={thumbUrl}
											alt={image.alt || `${title} - Image ${index + 1}`}
											className='h-full w-full object-cover'
											loading='lazy'
											onError={e => {
												// Fallback for broken images
												const target = e.target as HTMLImageElement
												target.src = '/placeholder-image.jpg'
											}}
										/>
									</div>
									{/* +X Overlay on last visible thumbnail when there are more */}
									{showRemainingCount && (
										<div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/70 backdrop-blur-sm'>
											<span className='text-base font-bold text-white'>
												+{remainingCount}
											</span>
										</div>
									)}
								</button>
							)
						})}
					</div>
				</div>
			)}

			{/* Zoom Modal */}
			{isZoomed && (
				<div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4'
					onClick={() => setIsZoomed(false)}
				>
					<button
						type='button'
						onClick={() => setIsZoomed(false)}
						className='absolute right-2 top-2 rounded-lg bg-black/50 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/70 sm:right-4 sm:top-4'
						aria-label='Close zoom'
					>
						Close
					</button>
					<img
						src={imageUrl}
						alt={currentImage.alt || title}
						className='max-h-full max-w-full object-contain'
						onClick={e => e.stopPropagation()}
					/>
				</div>
			)}
		</div>
	)
}



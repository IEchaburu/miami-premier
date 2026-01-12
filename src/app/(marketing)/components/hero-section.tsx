'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function HeroSection () {
	const [currentSlide, setCurrentSlide] = useState(0)

	// Hero image - local image from public folder
	const heroImage = '/images/hero/Captura de pantalla 2026-01-12 174937.png'

	const slides = [
		{
			title: 'Rivage Bal Harbor',
			location: 'Bal Harbor, Miami',
			price: 'from $10,000,000',
			status: 'pre-construction',
		},
	]

	const currentData = slides[currentSlide]

	function handlePrevious () {
		setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))
	}

	function handleNext () {
		setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))
	}

	return (
		<section className='relative h-screen w-full overflow-hidden'>
			{/* Background Image */}
			<div className='absolute inset-0'>
				<Image
					src={heroImage}
					alt={currentData.title}
					fill
					priority
					className='object-cover'
					quality={90}
					sizes='100vw'
				/>
				{/* Gradient Overlay for better text readability */}
				<div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40' />
			</div>

			{/* Content Overlay */}
			<div className='relative z-10 flex h-full flex-col justify-end'>
				<div className='mx-auto w-full max-w-7xl px-6 pb-12 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20'>
					<div className='ml-auto max-w-2xl space-y-6 text-white'>
						{/* Status Badge */}
						<div className='inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur-sm sm:px-5 sm:py-2 sm:text-sm'>
							{currentData.status}
						</div>

						{/* Title */}
						<h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'>
							{currentData.title}
						</h1>

						{/* Location */}
						<p className='text-lg font-medium uppercase tracking-wider text-white/90 sm:text-xl md:text-2xl'>
							{currentData.location}
						</p>

						{/* Price */}
						<p className='text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl'>
							{currentData.price}
						</p>

						{/* CTA Buttons */}
						<div className='flex flex-wrap items-center gap-4 pt-4'>
							<Link
								href={`/developments`}
								className='inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 sm:px-8 sm:py-3.5 sm:text-base'
							>
								More Details
							</Link>
							<button
								type='button'
								className='inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-8 sm:py-3.5 sm:text-base'
							>
								Schedule Viewing
							</button>
						</div>
					</div>
				</div>

				{/* Navigation Arrows - Only show if multiple slides */}
				{slides.length > 1 && (
					<>
						<button
							type='button'
							onClick={handlePrevious}
							className='absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-6 sm:h-14 sm:w-14'
							aria-label='Previous slide'
						>
							<ChevronLeft className='h-6 w-6 sm:h-7 sm:w-7' />
						</button>
						<button
							type='button'
							onClick={handleNext}
							className='absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6 sm:h-14 sm:w-14'
							aria-label='Next slide'
						>
							<ChevronRight className='h-6 w-6 sm:h-7 sm:w-7' />
						</button>
					</>
				)}

				{/* Pagination Dots - Only show if multiple slides */}
				{slides.length > 1 && (
					<div className='absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-8'>
						{slides.map((_, index) => (
							<button
								key={index}
								type='button'
								onClick={() => setCurrentSlide(index)}
								className={`h-2 rounded-full transition-all ${
									currentSlide === index
										? 'w-8 bg-white'
										: 'w-2 bg-white/50 hover:bg-white/75'
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	)
}

export { HeroSection }

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function FeaturedSections () {
	return (
		<section className='w-full'>
			<div className='mx-auto w-full max-w-[90rem]'>
				{/* Top Section - Full Width */}
				<div className='relative h-[60vh] w-full overflow-hidden sm:h-[70vh] lg:h-[80vh]'>
				<Image
					src='/images/hero/dark-beach-view.png'
					alt='Cityscape at dusk'
					fill
					className='object-cover'
					quality={90}
					priority
					sizes='100vw'
				/>
				{/* Gradient Overlay */}
				<div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60' />
				
				{/* Content Overlay */}
				<div className='relative z-10 flex h-full flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16'>
					<div className='max-w-2xl space-y-4 text-white sm:space-y-6'>
						{/* Headline */}
						<h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
							Invest Early, Maximize Returns
						</h2>

						{/* Description */}
						<p className='max-w-xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl'>
							Secure prime units in upcoming luxury developments with exclusive
							pre-launch pricing and payment plans.
						</p>

						{/* CTA Button */}
						<Link
							href='/developments'
							className='inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 sm:px-8 sm:py-3.5 sm:text-base'
						>
							Explore Projects
							<ArrowRight className='h-4 w-4 sm:h-5 sm:w-5' />
						</Link>
					</div>
				</div>
			</div>

			{/* Bottom Section - Two Images Side by Side */}
			<div className='flex w-full flex-col lg:flex-row'>
				{/* Left Image - Ultra-Luxury */}
				<div className='relative h-[50vh] w-full overflow-hidden lg:h-[60vh]'>
					<Image
						src='/images/hero/front-lobby.png'
						alt='Luxury lobby entrance'
						fill
						className='object-cover'
						quality={90}
						sizes='50vw'
					/>
					{/* Gradient Overlay */}
					<div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60' />
					
					{/* Content Overlay */}
					<div className='relative z-10 flex h-full flex-col justify-end px-6 pb-8 sm:px-8 sm:pb-12 md:px-12'>
						<div className='space-y-4 text-white'>
							{/* Headline */}
							<h3 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
								Ultra-Luxury
							</h3>

							{/* Description */}
							<p className='max-w-md text-base leading-relaxed text-white/90 sm:text-lg'>
								Exclusive penthouses and waterfront estates
							</p>

							{/* CTA Button */}
							<Link
								href='/developments?category=ultra-luxury'
								className='inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-8 sm:py-3.5 sm:text-base'
							>
								Explore
							</Link>
						</div>
					</div>
				</div>

				{/* Right Image - Waterfront Living */}
				<div className='relative h-[50vh] w-full overflow-hidden lg:h-[60vh]'>
					<Image
						src='/images/hero/bal-harbor-top-view.png'
						alt='Aerial view of waterfront development'
						fill
						className='object-cover'
						quality={90}
						sizes='50vw'
					/>
					{/* Gradient Overlay */}
					<div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60' />
					
					{/* Content Overlay */}
					<div className='relative z-10 flex h-full flex-col justify-end px-6 pb-8 sm:px-8 sm:pb-12 md:px-12'>
						<div className='space-y-4 text-white'>
							{/* Headline */}
							<h3 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
								Waterfront Living
							</h3>

							{/* Description */}
							<p className='max-w-md text-base leading-relaxed text-white/90 sm:text-lg'>
								Direct ocean and bay access properties
							</p>

							{/* CTA Button */}
							<Link
								href='/developments?category=waterfront'
								className='inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-8 sm:py-3.5 sm:text-base'
							>
								Explore
							</Link>
						</div>
					</div>
				</div>
			</div>
			</div>
		</section>
	)
}

export { FeaturedSections }


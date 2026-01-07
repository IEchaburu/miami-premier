'use client'

import { useState } from 'react'
import { Download, ZoomIn, X } from 'lucide-react'
import { getImageUrl } from '@/lib/utils/image-url'

interface FloorPlansSectionProps {
	floorPlans: Array<{
		id: number
		s3_bucket: string | null
		s3_key: string | null
		alt: string | null
		title: string | null
		sort_order: number
	}>
}

export function FloorPlansSection ({ floorPlans }: FloorPlansSectionProps) {
	const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
	const [isZoomed, setIsZoomed] = useState(false)

	if (!floorPlans || floorPlans.length === 0) {
		return null
	}

	function handleDownload (planId: number, e: React.MouseEvent) {
		e.stopPropagation()
		const plan = floorPlans.find(p => p.id === planId)
		if (plan) {
			const imageUrl = getImageUrl(plan)
			// Create a temporary link to download the image
			const link = document.createElement('a')
			link.href = imageUrl
			link.download = plan.title || `floor-plan-${planId}.jpg`
			link.target = '_blank'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		}
	}

	function handleViewFullPlan (planId: number) {
		setSelectedPlan(planId)
		setIsZoomed(true)
	}

	const currentPlan = selectedPlan !== null ? floorPlans[selectedPlan] : null
	const currentImageUrl = currentPlan ? getImageUrl(currentPlan) : ''

	return (
		<div className='mt-8 border-t border-zinc-200 pt-8 sm:mt-12 sm:pt-12'>
			<h2 className='mb-6 text-xl font-semibold text-zinc-900 sm:mb-8 sm:text-2xl'>
				Floor Plans
			</h2>
			<div className='space-y-6'>
				{floorPlans.map((plan, index) => {
					const imageUrl = getImageUrl(plan)

					return (
						<div
							key={plan.id}
							className='group relative w-full overflow-hidden rounded-lg border border-zinc-200 bg-white transition hover:border-zinc-300 hover:shadow-md'
						>
							{/* Floor Plan Image - Full Width */}
							<div className='relative w-full overflow-hidden bg-zinc-50'>
								<img
									src={imageUrl}
									alt={plan.alt || plan.title || `Floor plan ${index + 1}`}
									className='h-auto w-full object-contain'
									loading='lazy'
								/>
								{/* Zoom Button Overlay */}
								<button
									type='button'
									onClick={() => handleViewFullPlan(index)}
									className='absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/70 group-hover:opacity-100 sm:h-10 sm:w-10'
									aria-label='Zoom floor plan'
								>
									<ZoomIn className='h-4 w-4 sm:h-5 sm:w-5' />
								</button>
							</div>

							{/* Floor Plan Info */}
							<div className='p-4 sm:p-6'>
								{plan.title && (
									<h3 className='mb-4 text-base font-semibold text-zinc-900 sm:text-lg'>
										{plan.title}
									</h3>
								)}
								<div className='flex flex-col gap-2 sm:flex-row sm:gap-3'>
									<button
										type='button'
										onClick={() => handleViewFullPlan(index)}
										className='flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 sm:py-3'
									>
										View Full Plan
									</button>
									<button
										type='button'
										onClick={e => handleDownload(plan.id, e)}
										className='flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 sm:py-3'
									>
										<Download className='h-4 w-4' />
										Download
									</button>
								</div>
							</div>
						</div>
					)
				})}
			</div>

			{/* Zoom Modal */}
			{isZoomed && currentPlan && (
				<div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4'
					onClick={() => setIsZoomed(false)}
				>
					<button
						type='button'
						onClick={() => setIsZoomed(false)}
						className='absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:right-4 sm:top-4'
						aria-label='Close zoom'
					>
						<X className='h-5 w-5' />
					</button>
					<div className='relative max-h-full max-w-full'>
						<img
							src={currentImageUrl}
							alt={currentPlan.alt || currentPlan.title || 'Floor plan'}
							className='max-h-[90vh] max-w-full object-contain'
							onClick={e => e.stopPropagation()}
						/>
						{/* Download button in modal */}
						<div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
							<button
								type='button'
								onClick={e => {
									e.stopPropagation()
									handleDownload(currentPlan.id, e)
								}}
								className='flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100'
							>
								<Download className='h-4 w-4' />
								Download
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}


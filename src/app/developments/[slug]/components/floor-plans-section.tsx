'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
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
	const [selectedPlan, setSelectedPlan] = useState(0)

	if (!floorPlans || floorPlans.length === 0) {
		return null
	}

	function handleDownload (planId: number, e: React.MouseEvent) {
		e.stopPropagation()
		const plan = floorPlans.find(p => p.id === planId)
		if (plan) {
			const imageUrl = getImageUrl(plan)
			const link = document.createElement('a')
			link.href = imageUrl
			link.download = plan.title || `floor-plan-${planId}.jpg`
			link.target = '_blank'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		}
	}

	const currentPlan = floorPlans[selectedPlan]
	const currentImageUrl = getImageUrl(currentPlan)

	// Extract plan name from title (e.g., "Residence A" or just use index)
	function getPlanName (index: number, title: string | null) {
		if (title) return title
		return `Residence ${String.fromCharCode(65 + index)}`
	}

	return (
		<section className='bg-white px-8 py-24 md:px-16 lg:px-24'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-16 text-center'>
					<h2 className='mb-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl'>
						Residence Options
					</h2>
					<p className='text-lg text-neutral-600'>
						Thoughtfully designed spaces tailored to your lifestyle
					</p>
				</div>

				<div className='grid gap-12 lg:grid-cols-3'>
					{/* Floor Plan Cards */}
					{floorPlans.map((plan, index) => {
						const isSelected = selectedPlan === index
						return (
							<div
								key={plan.id}
								className={`cursor-pointer border-2 p-8 transition ${
									isSelected
										? 'border-neutral-900 bg-neutral-50'
										: 'border-neutral-200 hover:border-neutral-400'
								}`}
								onClick={() => setSelectedPlan(index)}
							>
								<div className='mb-2 text-xs uppercase tracking-widest text-neutral-500'>
									Floor Plan
								</div>
								<h3 className='mb-6 text-2xl font-semibold text-neutral-900'>
									{getPlanName(index, plan.title)}
								</h3>

								<button
									type='button'
									onClick={e => handleDownload(plan.id, e)}
									className='flex w-full items-center justify-center gap-2 border border-neutral-900 bg-neutral-900 px-6 py-3 text-white transition hover:bg-neutral-800'
								>
									<Download className='h-4 w-4' />
									Download Floor Plan
								</button>
							</div>
						)
					})}
				</div>

				{/* Floor Plan Preview */}
				<div className='mt-16 border-2 border-neutral-200 bg-neutral-50 p-12'>
					<div className='mx-auto max-w-4xl'>
						<div className='mb-6 text-center'>
							<h3 className='text-2xl font-semibold text-neutral-900'>
								{getPlanName(selectedPlan, currentPlan.title)} - Floor Plan Preview
							</h3>
						</div>

						{/* Floor Plan Image */}
						<div className='relative aspect-[16/10] w-full overflow-hidden bg-white p-8'>
							<img
								src={currentImageUrl}
								alt={currentPlan.alt || currentPlan.title || `Floor plan ${selectedPlan + 1}`}
								className='h-full w-full object-contain'
								loading='lazy'
							/>
						</div>

						<p className='mt-6 text-center text-sm text-neutral-500'>
							*Floor plans are subject to change. Contact us for detailed architectural
							drawings.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}


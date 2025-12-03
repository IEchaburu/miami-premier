import { PropertyCard } from '@/components/shared/property-card'
import { featuredDevelopments } from '@/lib/mock/home-data'
import { SectionHeader } from '@/components/shared/section-header'

function FeaturedDevelopmentsGrid () {
	return (
		<section className='border-b border-zinc-200 bg-white'>
			<div className='mx-auto max-w-7xl px-6 py-10'>
				<div className='mb-6 flex items-end justify-between'>
					<SectionHeader
						title='Featured Developments'
						subtitle='Discover our handpicked selection of premium pre-construction projects'
					/>
					<button
						type='button'
						className='hidden text-xs font-medium text-zinc-900 underline-offset-4 hover:underline md:inline-flex'
					>
						Browse all properties
					</button>
				</div>
				<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
					{featuredDevelopments.map(development => (
						<PropertyCard
							key={development.id}
							development={development}
						/>
					))}
				</div>
				<div className='mt-6 flex justify-center md:hidden'>
					<button
						type='button'
						className='inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-900 hover:bg-zinc-50'
					>
						Browse all properties
						<span>›</span>
					</button>
				</div>
			</div>
		</section>
	)
}

export { FeaturedDevelopmentsGrid }

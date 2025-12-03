import { SectionHeader } from '@/components/shared/section-header'
import { NeighborhoodCard } from '@/components/shared/neighborhood-card'
import { miamiNeighborhoods } from '@/lib/mock/home-data'

function MiamiNeighborhoodsCarousel () {
	return (
		<section className='border-b border-zinc-200 bg-zinc-50'>
			<div className='mx-auto max-w-7xl px-6 py-10'>
				<div className='mb-6 flex items-center justify-between'>
					<SectionHeader
						title='Miami&apos;s Premier Neighborhoods'
						subtitle='Discover luxury developments in Miami&apos;s most exclusive areas with premium amenities and prime locations.'
					/>
					<button
						type='button'
						className='hidden rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-900 hover:bg-zinc-50 md:inline-flex'
					>
						View all
					</button>
				</div>
				<div className='relative'>
					<div className='flex items-center gap-4 overflow-x-auto pb-3'>
						{miamiNeighborhoods.map(neighborhood => (
							<div
								key={neighborhood.id}
								className='min-w-[260px] max-w-xs flex-1'
							>
								<NeighborhoodCard neighborhood={neighborhood} />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export { MiamiNeighborhoodsCarousel }

import type { Neighborhood } from '@/lib/mock/home-data'

interface NeighborhoodCardProps {
	neighborhood: Neighborhood
}

function NeighborhoodCard ({ neighborhood }: NeighborhoodCardProps) {
	return (
		<article className='flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm'>
			<div className='h-32 bg-zinc-200' aria-hidden='true' />
			<div className='flex flex-1 flex-col gap-3 p-4'>
				<p className='text-xs font-medium uppercase tracking-wide text-zinc-500'>
					{neighborhood.tagline}
				</p>
				<div className='space-y-1'>
					<h3 className='text-sm font-semibold tracking-tight text-zinc-900'>
						{neighborhood.name}
					</h3>
					<p className='text-xs text-zinc-500'>
						{neighborhood.developments} Developments
					</p>
					<p className='text-xs text-zinc-600'>
						{neighborhood.averagePrice}
						{' • '}
						{neighborhood.priceFrom}
					</p>
				</div>
				<div className='flex flex-wrap gap-1 pt-1'>
					{neighborhood.features.map(feature => (
						<span
							key={feature}
							className='rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-700'
						>
							{feature}
						</span>
					))}
				</div>
				<div className='mt-auto flex gap-2 pt-2'>
					<button
						type='button'
						className='inline-flex flex-1 items-center justify-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50'
					>
						Explore
					</button>
					<button
						type='button'
						className='inline-flex flex-1 items-center justify-center rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800'
					>
						Contact
					</button>
				</div>
			</div>
		</article>
	)
}

export { NeighborhoodCard }

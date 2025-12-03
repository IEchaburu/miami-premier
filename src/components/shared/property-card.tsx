import type { Development } from '@/lib/mock/home-data'

interface PropertyCardProps {
	development: Development
}

function PropertyCard ({ development }: PropertyCardProps) {
	return (
		<article className='flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm'>
			<div className='h-40 bg-zinc-200' aria-hidden='true' />
			<div className='flex flex-1 flex-col gap-3 p-4'>
				<div className='flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-zinc-600'>
					<span className='rounded-full bg-zinc-100 px-2 py-0.5'>
						{development.status}
					</span>
					<span className='text-zinc-500'>
						{development.country}
					</span>
				</div>
				<div className='space-y-1'>
					<p className='flex items-center gap-1 text-xs text-zinc-500'>
						<span className='inline-block h-1.5 w-1.5 rounded-full bg-zinc-900' />
						<span>{development.location}</span>
					</p>
					<h3 className='text-sm font-semibold tracking-tight text-zinc-900'>
						{development.name}
					</h3>
					<p className='text-sm font-medium text-zinc-900'>
						{development.priceFrom}
					</p>
				</div>
				<div className='mt-auto flex gap-2 pt-2'>
					<button
						type='button'
						className='inline-flex flex-1 items-center justify-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50'
					>
						See Details
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

export { PropertyCard }

import { heroProperties } from '@/lib/mock/home-data'

function HeroSection () {
	const property = heroProperties[0]

	return (
		<section className='border-b border-zinc-200 bg-white'>
			<div className='mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:py-14'>
				<div className='space-y-6'>
					<div className='inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700'>
						<span className='text-lg'>🏢</span>
						<span className='uppercase tracking-wide'>
							Exclusive access to pre-sales Miami
						</span>
					</div>
					<div className='space-y-3'>
						<h1 className='text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl'>
							{property.title}
						</h1>
						<p className='text-sm font-medium uppercase tracking-wide text-zinc-500'>
							{property.location}
						</p>
						<p className='text-sm text-zinc-600'>
							{property.description}
						</p>
						<p className='text-base font-semibold text-zinc-900'>
							{property.priceFrom}
						</p>
					</div>
					<div className='flex flex-wrap items-center gap-3'>
						<button
							type='button'
							className='inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-xs font-medium text-white hover:bg-zinc-800'
						>
							More details
						</button>
						<button
							type='button'
							className='inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2 text-xs font-medium text-zinc-900 hover:bg-zinc-50'
						>
							Schedule viewing
						</button>
					</div>
					<div className='flex items-center gap-3 text-xs text-zinc-500'>
						<button
							type='button'
							className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white hover:bg-zinc-50'
						>
							‹
						</button>
						<button
							type='button'
							className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white hover:bg-zinc-50'
						>
							›
						</button>
						<div className='flex items-center gap-1'>
							<span className='h-1.5 w-4 rounded-full bg-zinc-900' />
							<span className='h-1.5 w-1.5 rounded-full bg-zinc-300' />
							<span className='h-1.5 w-1.5 rounded-full bg-zinc-300' />
							<span className='h-1.5 w-1.5 rounded-full bg-zinc-300' />
						</div>
					</div>
				</div>

				<div className='flex flex-col gap-4'>
					<div className='h-56 rounded-3xl bg-zinc-200' aria-hidden='true' />
					<div className='flex justify-between text-xs text-zinc-600'>
						<p>Flexible financing up to 60 installments</p>
						<p>Exclusive discounts in pre-sale stage</p>
						<p>Protection of your investment</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export { HeroSection }

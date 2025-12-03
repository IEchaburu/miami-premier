import { SectionHeader } from '@/components/shared/section-header'

const featuredStripItems = [
	{
		id: 'brickell-heights',
		name: 'Brickell Heights',
		detail: 'Brickell • From $850K',
	},
	{
		id: 'waterfront-residences',
		name: 'Waterfront Residences',
		detail: 'Downtown Miami • From $1.2M',
	},
	{
		id: 'modern-apartments',
		name: 'Modern Apartments',
		detail: 'Midtown • From $650K',
	},
	{
		id: 'coral-gables-luxury',
		name: 'Coral Gables Luxury',
		detail: 'Coral Gables • From $1.8M',
	},
	{
		id: 'wynwood-lofts',
		name: 'Wynwood Lofts',
		detail: 'Wynwood • From $750K',
	},
]

function FeaturedStrip () {
	return (
		<section className='bg-white'>
			<div className='mx-auto max-w-7xl px-6 py-10'>
				<div className='mb-6 flex items-center justify-between'>
					<SectionHeader
						title='Our Featured Developments'
						subtitle='Discover Miami&apos;s most exclusive real estate developments with preferential access and pre-construction pricing.'
					/>
					<div className='hidden gap-2 md:flex'>
						<button
							type='button'
							className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs text-zinc-700 hover:bg-zinc-50'
						>
							‹
						</button>
						<button
							type='button'
							className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 text-xs text-white hover:bg-zinc-800'
						>
							›
						</button>
					</div>
				</div>
				<div className='flex gap-4 overflow-x-auto pb-3'>
					{featuredStripItems.map(item => (
						<button
							key={item.id}
							type='button'
							className='flex min-w-[220px] max-w-xs items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-left hover:bg-zinc-100'
						>
							<div className='h-14 w-16 rounded-xl bg-zinc-200' />
							<div className='space-y-1'>
								<p className='text-xs font-semibold text-zinc-900'>
									{item.name}
								</p>
								<p className='text-[11px] text-zinc-600'>
									{item.detail}
								</p>
							</div>
						</button>
					))}
				</div>
			</div>
		</section>
	)
}

export { FeaturedStrip }

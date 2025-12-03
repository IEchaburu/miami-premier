import Link from 'next/link'
import { highlightTiles } from '@/lib/mock/home-data'

function HighlightTiles () {
	return (
		<section className='border-b border-zinc-200 bg-zinc-50'>
			<div className='mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-8 md:grid-cols-3'>
				{highlightTiles.map(tile => (
					<Link
						key={tile.id}
						href={tile.href}
						className='group flex items-center justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-left shadow-xs transition-colors hover:bg-zinc-50'
					>
						<div className='space-y-1'>
							<h3 className='text-sm font-semibold tracking-tight text-zinc-900'>
								{tile.title}
							</h3>
							<p className='text-xs text-zinc-600'>
								{tile.subtitle}
							</p>
							<button
								type='button'
								className='mt-2 inline-flex items-center gap-1 text-xs font-medium text-zinc-900 group-hover:underline'
							>
								See more
								<span>›</span>
							</button>
						</div>
						<div className='h-16 w-20 rounded-xl bg-zinc-200' />
					</Link>
				))}
			</div>
		</section>
	)
}

export { HighlightTiles }

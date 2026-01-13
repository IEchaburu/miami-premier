import Link from 'next/link'

function DevelopmentsCTA () {
	return (
		<section className='bg-white py-8 sm:py-10 lg:py-12'>
			<div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-12'>
				<div className='flex flex-col items-center text-center'>
					{/* Main Title */}
					<h2 className='mb-2 text-2xl font-black uppercase tracking-tight text-zinc-900 sm:text-3xl md:text-4xl'>
						Lorem Ipsum Dolor Sit Amet
					</h2>

					{/* Subtitle */}
					<p className='mb-4 max-w-2xl text-sm font-normal text-zinc-900 sm:text-base md:text-lg'>
						Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua
					</p>

					{/* CTA Button */}
					<Link
						href='/developments'
						className='inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 sm:px-8 sm:py-3 sm:text-base'
					>
						All Developments
					</Link>
				</div>
			</div>
		</section>
	)
}

export { DevelopmentsCTA }


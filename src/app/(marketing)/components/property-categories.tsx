const categories = [
	'Luxury Condos',
	'Waterfront Properties',
	'Investment Properties',
	'Pre-Construction',
	'Penthouses',
	'Commercial',
	'Rental Properties',
	'All Properties',
]

function PropertyCategories () {
	return (
		<section className='border-b border-zinc-200 bg-white'>
			<div className='mx-auto max-w-7xl px-6 py-8'>
				<h2 className='mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500'>
					Find properties near you
				</h2>
				<div className='grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8'>
					{categories.map(category => (
						<button
							key={category}
							type='button'
							className='flex flex-col items-start gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-left text-xs font-medium text-zinc-800 hover:bg-zinc-100'
						>
							<div className='h-8 w-8 rounded-full bg-zinc-200' />
							<span>{category}</span>
						</button>
					))}
				</div>
			</div>
		</section>
	)
}

export { PropertyCategories }

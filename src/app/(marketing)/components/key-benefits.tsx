function KeyBenefits () {
	const items = [
		'Flexible financing up to 60 installments',
		'Exclusive discounts in pre-sale stage',
		'Protection of your investment',
	]

	return (
		<section className='border-b border-zinc-200 bg-zinc-50'>
			<div className='mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3'>
				{items.map(item => (
					<div
						key={item}
						className='rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-xs'
					>
						{item}
					</div>
				))}
			</div>
		</section>
	)
}

export { KeyBenefits }

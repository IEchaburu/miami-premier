interface SectionHeaderProps {
	title: string
	subtitle?: string
	align?: 'left' | 'center'
}

function SectionHeader ({ title, subtitle, align = 'left' }: SectionHeaderProps) {
	const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

	return (
		<div className={`flex flex-col gap-1 ${alignment}`}>
			<h2 className='text-xl font-semibold tracking-tight text-zinc-900'>
				{title}
			</h2>
			{subtitle && (
				<p className='text-sm text-zinc-600'>
					{subtitle}
				</p>
			)}
		</div>
	)
}

export { SectionHeader }

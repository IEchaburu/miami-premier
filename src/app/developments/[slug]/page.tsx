interface PageProps {
	params: Promise<{ slug: string }>
}

export default async function DevelopmentDetailPage ({
	params,
}: PageProps) {
	const { slug } = await params

	return (
		<div className='min-h-screen bg-zinc-50'>
			<main className='mx-auto max-w-7xl px-6 py-10'>
				<h1 className='text-2xl font-semibold text-zinc-900'>
					Development: {slug}
				</h1>
				<p className='mt-2 text-zinc-600'>
					Development detail page coming soon
				</p>
			</main>
		</div>
	)
}
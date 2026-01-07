import Link from 'next/link'

export default function NotFound () {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-white px-6'>
			<h1 className='text-4xl font-bold text-zinc-900'>404</h1>
			<p className='mt-4 text-lg text-zinc-600'>
				Development not found
			</p>
			<Link
				href='/developments'
				className='mt-6 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800'
			>
				Back to Developments
			</Link>
		</div>
	)
}


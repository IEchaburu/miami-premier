'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/lib/auth-client'

export function ProfileActions () {
	const router = useRouter()

	async function handleLogout () {
		await signOut()
		router.push('/')
	}

	return (
		<div className='flex items-center gap-3'>
			<Link
				href='/'
				className='rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800'
			>
				Home
			</Link>
			<button
				type='button'
				onClick={handleLogout}
				className='rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
			>
				Log out
			</button>
		</div>
	)
}
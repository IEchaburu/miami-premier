'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/lib/auth-client'
import { Calendar, Pencil, ArrowRight, Home } from 'lucide-react'

interface ProfileSidebarProps {
	user: {
		id: string
		name: string
		email: string
		createdAt: Date
	} | null
	session: {
		user: {
			id: string
			name: string
			email: string
		}
	}
}

export function ProfileSidebar ({ user, session }: ProfileSidebarProps) {
	const router = useRouter()

	const displayName = user?.name ?? session.user.name ?? 'User'
	const displayEmail = user?.email ?? session.user.email
	const memberSince = user?.createdAt
		? new Date(user.createdAt).toLocaleDateString('en-US', {
				month: 'short',
				year: 'numeric',
		  })
		: 'Jan 2024'

	const initials = displayName
		.split(' ')
		.map(part => part[0])
		.join('')
		.toUpperCase()
		.slice(0, 2)

	async function handleSignOut () {
		await signOut()
		router.push('/')
	}

	return (
		<aside className='w-full rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900 lg:w-80'>
			{/* Avatar */}
			<div className='mb-6 flex justify-center'>
				<div className='flex h-24 w-24 items-center justify-center rounded-full bg-zinc-200 text-2xl font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'>
					{initials}
				</div>
			</div>

			{/* User Info */}
			<div className='mb-6 text-center'>
				<h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
					{displayName}
				</h2>
				<p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>
					{displayEmail}
				</p>
			</div>

			{/* Member Since */}
			<div className='mb-6 flex items-center justify-center gap-2 text-sm text-zinc-600 dark:text-zinc-400'>
				<Calendar className='h-4 w-4' />
				<span>Member Since: {memberSince}</span>
			</div>

			{/* Actions */}
			<div className='space-y-3'>
				<Link
					href='/'
					className='flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
				>
					<Home className='h-4 w-4' />
					Back to Home
				</Link>
				<button
					type='button'
					onClick={() => {
						// Scroll to edit form or handle edit
						document
							.getElementById('personal-information')
							?.scrollIntoView({ behavior: 'smooth' })
					}}
					className='flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
				>
					<Pencil className='h-4 w-4' />
					Edit Profile
				</button>
				<button
					type='button'
					onClick={handleSignOut}
					className='flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
				>
					Sign Out
					<ArrowRight className='h-4 w-4' />
				</button>
			</div>
		</aside>
	)
}


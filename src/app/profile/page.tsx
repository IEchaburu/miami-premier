import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import prisma from '@/lib/prisma'
import { getServerSession } from '@/lib/get-session'
import { ProfileSidebar } from './components/profile-sidebar'
import { ProfileTabs } from './components/profile-tabs'

export default async function ProfilePage () {
	const session = await getServerSession()

	if (!session?.user) {
		redirect('/sign-in')
	}

	const userId = session.user.id

	const user = await prisma.marketplace_users.findUnique({
		where: { id: userId },
	})

	const favorites = await prisma.user_favorite_projects.findMany({
		where: { user_id: userId },
		include: {
			projects: {
				include: {
					markets: true,
					areas_barrios: true,
				},
			},
		},
	})

	// Fetch featured projects for investment recommendations
	const recommendations = await prisma.projects.findMany({
		where: {
			is_published: true,
		},
		include: {
			markets: true,
			areas_barrios: true,
		},
		take: 2,
		orderBy: {
			created_at: 'desc',
		},
	})

	return (
		<div className='min-h-screen bg-zinc-50 dark:bg-zinc-950'>
			{/* Header with Logo and Breadcrumb */}
			<header className='border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80'>
				<div className='mx-auto max-w-7xl px-4 py-4 lg:px-8'>
					<div className='flex items-center justify-between'>
						{/* Logo/Brand Link */}
						<Link
							href='/'
							className='flex items-center gap-2 transition hover:opacity-80'
						>
							<div className='flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900'>
								<span>MP</span>
							</div>
							<div className='flex flex-col leading-tight'>
								<span className='text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50'>
									Miami Premier
								</span>
								<span className='text-xs text-zinc-500 dark:text-zinc-400'>
									Luxury Developments
								</span>
							</div>
						</Link>

						{/* Breadcrumb Navigation */}
						<nav
							className='flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400'
							aria-label='Breadcrumb'
						>
							<Link
								href='/'
								className='flex items-center gap-1 transition hover:text-zinc-900 dark:hover:text-zinc-50'
							>
								<Home className='h-4 w-4' />
								<span>Home</span>
							</Link>
							<ChevronRight className='h-4 w-4 text-zinc-400' />
							<span className='text-zinc-900 dark:text-zinc-50'>
								Profile
							</span>
						</nav>
					</div>
				</div>
			</header>

			<main className='mx-auto max-w-7xl px-4 py-8 lg:px-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-zinc-900 dark:text-zinc-50'>
						My Profile
					</h1>
					<p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
						Manage your account information
					</p>
				</div>

				<div className='flex flex-col gap-6 lg:flex-row'>
					{/* Left Sidebar */}
					<ProfileSidebar
						user={user}
						session={session}
					/>

					{/* Main Content */}
					<div className='flex-1'>
						<ProfileTabs
							user={user}
							session={session}
							favorites={favorites}
							recommendations={recommendations}
						/>
					</div>
				</div>
			</main>
		</div>
	)
}
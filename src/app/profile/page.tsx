import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { getServerSession } from '@/lib/get-session'
import { ProfileActions } from './profile-actions'

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
				},
			},
		},
	})

	return (
		<div className='min-h-screen bg-zinc-50 dark:bg-black'>
			<main className='mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 lg:flex-row'>
				{/* left column: user summary */}
				<section className='w-full rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900 lg:max-w-sm'>
					<div className='mb-4 flex items-start justify-between gap-3'>
						<div>
							<h1 className='text-2xl font-semibold text-zinc-900 dark:text-zinc-50'>
								Profile
							</h1>
							<p className='mt-1 text-xs text-zinc-500'>
								Account details for your buyer profile
							</p>
						</div>
						<ProfileActions />
					</div>

					<div className='mt-4 flex items-center gap-4'>
						<div className='flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'>
							{(user?.name ?? session.user.name ?? 'U')
								.split(' ')
								.map(part => part[0])
								.join('')
								.toUpperCase()}
						</div>
						<div className='space-y-1 text-sm text-zinc-700 dark:text-zinc-200'>
							<p className='font-medium'>
								{user?.name ?? session.user.name ?? 'Unnamed user'}
							</p>
							<p className='text-xs text-zinc-500'>
								{user?.email ?? session.user.email}
							</p>
						</div>
					</div>

					<div className='mt-6 space-y-4 text-sm text-zinc-700 dark:text-zinc-200'>
						<div>
							<p className='text-xs uppercase tracking-wide text-zinc-500'>
								Name
							</p>
							<p className='mt-1'>
								{user?.name ?? session.user.name ?? 'Not provided'}
							</p>
						</div>
						<div>
							<p className='text-xs uppercase tracking-wide text-zinc-500'>
								Email
							</p>
							<p className='mt-1'>
								{user?.email ?? session.user.email}
							</p>
						</div>
					</div>

					<div className='mt-6 rounded-lg bg-zinc-50 p-3 text-xs text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300'>
						<p className='font-medium text-zinc-800 dark:text-zinc-100'>
							Account insights
						</p>
						<ul className='mt-2 list-disc space-y-1 pl-4'>
							<li>Save favorite projects to track launches</li>
							<li>Compare units across markets you care about</li>
							<li>Get ready for future alerts and recommendations</li>
						</ul>
					</div>
				</section>

				{/* right column: favorites */}
				<section className='flex-1 rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900'>
					<div className='mb-4 flex items-center justify-between'>
						<h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
							Favorite projects
						</h2>
						<p className='text-xs text-zinc-500'>
							{favorites.length} saved project
							{favorites.length === 1 ? '' : 's'}
						</p>
					</div>

					{favorites.length === 0 ? (
						<div className='rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400'>
							<p className='font-medium text-zinc-800 dark:text-zinc-100'>
								No favorites yet
							</p>
							<p className='mt-1 text-xs'>
								Explore pre-construction projects and tap the “save”
								action to keep them here for quick access.
							</p>
						</div>
					) : (
						<ul className='grid gap-4 md:grid-cols-2'>
							{favorites.map(fav => {
								const project = fav.projects
								return (
									<li
										key={`${fav.user_id}-${fav.project_id}`}
										className='group flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm transition hover:border-zinc-400 hover:bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600'
									>
										<p className='mb-1 line-clamp-2 text-sm font-medium text-zinc-900 dark:text-zinc-50'>
											{project.title}
										</p>
										<p className='text-xs text-zinc-500'>
											{project.markets?.name ?? 'Market'}
										</p>
										{project.price_usd && (
											<p className='mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
												USD {project.price_usd.toLocaleString()}
											</p>
										)}
										<p className='mt-1 text-xs text-zinc-500'>
											Status: {project.status ?? 'N/A'}
										</p>
										<p className='mt-3 text-xs text-zinc-500'>
											Click a project in the listings to view full
											details, gallery, and payment schedule.
										</p>
									</li>
								)
							})}
						</ul>
					)}
				</section>
			</main>
		</div>
	)
}
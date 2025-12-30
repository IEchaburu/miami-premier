'use client'

import Link from 'next/link'

interface FavoritesTabProps {
	favorites: Array<{
		user_id: string
		project_id: number
		projects: {
			id: number
			title: string
			price_usd: number | null
			status: string | null
			markets: {
				name: string
			} | null
			areas_barrios: {
				name: string
			} | null
		}
	}>
}

export function FavoritesTab ({ favorites }: FavoritesTabProps) {
	if (favorites.length === 0) {
		return (
			<div className='rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-950/40'>
				<p className='text-sm font-medium text-zinc-800 dark:text-zinc-100'>
					No favorites yet
				</p>
				<p className='mt-1 text-xs text-zinc-600 dark:text-zinc-400'>
					Explore pre-construction projects and save your favorites here.
				</p>
			</div>
		)
	}

	return (
		<div className='space-y-4'>
			<div className='mb-4 flex items-center justify-between'>
				<h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
					Favorite Projects
				</h2>
				<p className='text-sm text-zinc-600 dark:text-zinc-400'>
					{favorites.length} saved project{favorites.length === 1 ? '' : 's'}
				</p>
			</div>
			<div className='grid gap-4 md:grid-cols-2'>
				{favorites.map(fav => {
					const project = fav.projects
					return (
						<Link
							key={`${fav.user_id}-${fav.project_id}`}
							href={`/developments/${project.id}`}
							className='group rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-400 hover:bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600'
						>
							<h3 className='mb-1 line-clamp-2 text-sm font-medium text-zinc-900 dark:text-zinc-50'>
								{project.title}
							</h3>
							<p className='text-xs text-zinc-500 dark:text-zinc-400'>
								{project.markets?.name ?? 'Market'}
								{project.areas_barrios?.name &&
									` • ${project.areas_barrios.name}`}
							</p>
							{project.price_usd && (
								<p className='mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
									USD {project.price_usd.toLocaleString()}
								</p>
							)}
							{project.status && (
								<p className='mt-1 text-xs text-zinc-500 dark:text-zinc-400'>
									Status: {project.status}
								</p>
							)}
						</Link>
					)
				})}
			</div>
		</div>
	)
}


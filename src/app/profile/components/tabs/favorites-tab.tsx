'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, X } from 'lucide-react'

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

export function FavoritesTab ({ favorites: initialFavorites }: FavoritesTabProps) {
	const router = useRouter()
	const [favorites, setFavorites] = useState(initialFavorites)
	const [removingId, setRemovingId] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)

	async function handleRemoveFavorite (projectId: number, e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()

		setRemovingId(projectId)
		setError(null)

		try {
			const response = await fetch(`/api/favorites/${projectId}`, {
				method: 'POST',
			})

			if (!response.ok) {
				const data = await response.json()
				throw new Error(data.error || 'Failed to remove favorite')
			}

			// Remove from local state
			setFavorites(prev => prev.filter(fav => fav.project_id !== projectId))

			// Refresh the page to sync with server
			router.refresh()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to remove favorite')
			console.error('Error removing favorite:', err)
		} finally {
			setRemovingId(null)
		}
	}

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

			{error && (
				<div className='rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200'>
					{error}
				</div>
			)}

			<div className='grid gap-4 md:grid-cols-2'>
				{favorites.map(fav => {
					const project = fav.projects
					const isRemoving = removingId === project.id

					return (
						<div
							key={`${fav.user_id}-${fav.project_id}`}
							className='group relative rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-400 hover:bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600'
						>
							{/* Remove Button */}
							<button
								type='button'
								onClick={e => handleRemoveFavorite(project.id, e)}
								disabled={isRemoving}
								className='absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-zinc-600 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 disabled:opacity-50 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:bg-red-900/20'
								aria-label='Remove from favorites'
							>
								{isRemoving ? (
									<div className='h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600' />
								) : (
									<X className='h-4 w-4' />
								)}
							</button>

							<Link
								href={`/developments/${project.id}`}
								className='block'
							>
								<h3 className='mb-1 line-clamp-2 pr-8 text-sm font-medium text-zinc-900 dark:text-zinc-50'>
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
						</div>
					)
				})}
			</div>
		</div>
	)
}


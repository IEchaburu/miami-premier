import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from '@/lib/get-session'

/**
 * GET /api/favorites/[projectId]
 * Check if a project is favorited by the current user
 */
export async function GET (
	request: NextRequest,
	{ params }: { params: Promise<{ projectId: string }> }
) {
	try {
		const session = await getServerSession()

		if (!session?.user) {
			return NextResponse.json({ isFavorited: false }, { status: 200 })
		}

		const { projectId } = await params
		const projectIdNum = Number(projectId)

		if (isNaN(projectIdNum)) {
			return NextResponse.json(
				{ error: 'Invalid project ID' },
				{ status: 400 }
			)
		}

		const favorite = await prisma.user_favorite_projects.findUnique({
			where: {
				user_id_project_id: {
					user_id: session.user.id,
					project_id: projectIdNum,
				},
			},
		})

		return NextResponse.json(
			{ isFavorited: !!favorite },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error checking favorite status:', error)
		return NextResponse.json(
			{ error: 'Failed to check favorite status' },
			{ status: 500 }
		)
	}
}

/**
 * POST /api/favorites/[projectId]
 * Toggle favorite status (add or remove)
 */
export async function POST (
	request: NextRequest,
	{ params }: { params: Promise<{ projectId: string }> }
) {
	try {
		const session = await getServerSession()

		if (!session?.user) {
			return NextResponse.json(
				{ error: 'Unauthorized', requiresAuth: true },
				{ status: 401 }
			)
		}

		const { projectId } = await params
		const projectIdNum = Number(projectId)

		if (isNaN(projectIdNum)) {
			return NextResponse.json(
				{ error: 'Invalid project ID' },
				{ status: 400 }
			)
		}

		// Check if project exists
		const project = await prisma.projects.findUnique({
			where: { id: projectIdNum },
		})

		if (!project) {
			return NextResponse.json(
				{ error: 'Project not found' },
				{ status: 404 }
			)
		}

		// Check if already favorited
		const existingFavorite = await prisma.user_favorite_projects.findUnique({
			where: {
				user_id_project_id: {
					user_id: session.user.id,
					project_id: projectIdNum,
				},
			},
		})

		if (existingFavorite) {
			// Remove favorite
			await prisma.user_favorite_projects.delete({
				where: {
					user_id_project_id: {
						user_id: session.user.id,
						project_id: projectIdNum,
					},
				},
			})

			return NextResponse.json(
				{ isFavorited: false, message: 'Removed from favorites' },
				{ status: 200 }
			)
		} else {
			// Add favorite
			await prisma.user_favorite_projects.create({
				data: {
					user_id: session.user.id,
					project_id: projectIdNum,
				},
			})

			return NextResponse.json(
				{ isFavorited: true, message: 'Added to favorites' },
				{ status: 200 }
			)
		}
	} catch (error) {
		console.error('Error toggling favorite:', error)
		return NextResponse.json(
			{ error: 'Failed to update favorite status' },
			{ status: 500 }
		)
	}
}


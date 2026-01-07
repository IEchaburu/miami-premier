import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface Market {
	id: number
	name: string
	country: string
	code: string
}

interface MarketsResponse {
	markets: Market[]
}

export async function GET () {
	try {
		const markets = await prisma.markets.findMany({
			select: {
				id: true,
				name: true,
				country: true,
				code: true,
			},
			orderBy: {
				name: 'asc',
			},
		})

		const response: MarketsResponse = { markets }
		return NextResponse.json(response, { status: 200 })
	} catch (error) {
		console.error('Error fetching markets:', error)
		const errorMessage =
			error instanceof Error ? error.message : 'Failed to fetch markets'
		return NextResponse.json(
			{ error: errorMessage },
			{ status: 500 }
		)
	}
}


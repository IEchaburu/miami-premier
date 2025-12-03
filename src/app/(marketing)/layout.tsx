import type { ReactNode } from 'react'
import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'
import { getServerSession } from '@/lib/get-session'

interface MarketingLayoutProps {
	children: ReactNode
}

export default async function MarketingLayout ({
	children,
}: MarketingLayoutProps) {
	const session = await getServerSession()
	const user = session?.user

	return (
		<>
			<Navbar isAuthenticated={!!user} />
			<main className='min-h-screen'>
				{children}
			</main>
			<Footer />
		</>
	)
}




'use client'

import { useState } from 'react'
import { User, Clock, Heart, Bell, Calendar, FileText } from 'lucide-react'
import { PersonalTab } from './tabs/personal-tab'
import { FavoritesTab } from './tabs/favorites-tab'

interface ProfileTabsProps {
	user: {
		id: string
		name: string
		email: string
		phone_number: string | null
	} | null
	session: {
		user: {
			id: string
			name: string
			email: string
		}
	}
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
	recommendations: Array<{
		id: number
		title: string
		price_usd: number | null
		short_description: string | null
		markets: {
			name: string
		} | null
		areas_barrios: {
			name: string
		} | null
	}>
}

const tabs = [
	{ id: 'personal', label: 'Personal', icon: User },
	{ id: 'history', label: 'History', icon: Clock },
	{ id: 'favorites', label: 'Favorites', icon: Heart },
	{ id: 'alerts', label: 'Alerts', icon: Bell },
	{ id: 'meetings', label: 'Meetings', icon: Calendar },
	{ id: 'documents', label: 'Documents', icon: FileText },
]

export function ProfileTabs ({
	user,
	session,
	favorites,
	recommendations,
}: ProfileTabsProps) {
	const [activeTab, setActiveTab] = useState('personal')

	return (
		<div className='rounded-xl bg-white shadow-sm dark:bg-zinc-900'>
			{/* Tab Navigation */}
			<div className='border-b border-zinc-200 dark:border-zinc-800'>
				<nav className='flex overflow-x-auto'>
					{tabs.map(tab => {
						const Icon = tab.icon
						const isActive = activeTab === tab.id
						return (
							<button
								key={tab.id}
								type='button'
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 border-b-2 px-6 py-4 text-sm font-medium transition ${
									isActive
										? 'border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50'
										: 'border-transparent text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-50'
								}`}
							>
								<Icon className='h-4 w-4' />
								{tab.label}
							</button>
						)
					})}
				</nav>
			</div>

			{/* Tab Content */}
			<div className='p-6'>
				{activeTab === 'personal' && (
					<PersonalTab
						user={user}
						session={session}
						recommendations={recommendations}
					/>
				)}
				{activeTab === 'favorites' && (
					<FavoritesTab favorites={favorites} />
				)}
				{activeTab === 'history' && (
					<div className='py-8 text-center text-sm text-zinc-600 dark:text-zinc-400'>
						History coming soon
					</div>
				)}
				{activeTab === 'alerts' && (
					<div className='py-8 text-center text-sm text-zinc-600 dark:text-zinc-400'>
						Alerts coming soon
					</div>
				)}
				{activeTab === 'meetings' && (
					<div className='py-8 text-center text-sm text-zinc-600 dark:text-zinc-400'>
						Meetings coming soon
					</div>
				)}
				{activeTab === 'documents' && (
					<div className='py-8 text-center text-sm text-zinc-600 dark:text-zinc-400'>
						Documents coming soon
					</div>
				)}
			</div>
		</div>
	)
}


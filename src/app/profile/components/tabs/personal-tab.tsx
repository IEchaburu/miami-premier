'use client'

import { useState } from 'react'
import { User, Settings, TrendingUp, X, Save } from 'lucide-react'

interface PersonalTabProps {
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

export function PersonalTab ({
	user,
	session,
	recommendations,
}: PersonalTabProps) {
	const [fullName, setFullName] = useState(
		user?.name ?? session.user.name ?? ''
	)
	const [email, setEmail] = useState(user?.email ?? session.user.email)
	const [phoneNumber, setPhoneNumber] = useState(user?.phone_number ?? '')
	const [language, setLanguage] = useState('English')
	const [emailNotifications, setEmailNotifications] = useState(true)

	// Mock investment scores and ROI - in real app, these would come from backend
	const getInvestmentScore = (index: number) => {
		return index === 0 ? 92 : 88
	}

	const getROI = (index: number) => {
		return index === 0 ? '15-18%' : '12-15%'
	}

	const getMarketTrend = (index: number) => {
		return index === 0 ? 'Rising' : 'Stable'
	}

	const getDescription = (project: (typeof recommendations)[0], index: number) => {
		if (index === 0) {
			return 'High growth area with excellent amenities'
		}
		return 'Waterfront location with strong rental demand'
	}

	async function handleSave () {
		// TODO: Implement save functionality with server action
		console.log('Saving profile...', { fullName, email, phoneNumber })
	}

	function handleCancel () {
		setFullName(user?.name ?? session.user.name ?? '')
		setEmail(user?.email ?? session.user.email)
		setPhoneNumber(user?.phone_number ?? '')
	}

	return (
		<div className='space-y-8' id='personal-information'>
			{/* Personal Information */}
			<section>
				<div className='mb-4 flex items-center gap-2'>
					<User className='h-5 w-5 text-zinc-700 dark:text-zinc-300' />
					<h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
						Personal Information
					</h2>
				</div>
				<div className='space-y-4'>
					<div>
						<label
							htmlFor='full-name'
							className='mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300'
						>
							Full Name
						</label>
						<input
							id='full-name'
							type='text'
							value={fullName}
							onChange={e => setFullName(e.target.value)}
							className='w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500'
						/>
					</div>
					<div>
						<label
							htmlFor='email'
							className='mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300'
						>
							Email Address
						</label>
						<input
							id='email'
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500'
						/>
					</div>
					<div>
						<label
							htmlFor='phone'
							className='mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300'
						>
							Phone Number
						</label>
						<input
							id='phone'
							type='tel'
							value={phoneNumber}
							onChange={e => setPhoneNumber(e.target.value)}
							placeholder='+1 (305) 555-0123'
							className='w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500'
						/>
					</div>
					<div className='flex gap-3 pt-2'>
						<button
							type='button'
							onClick={handleSave}
							className='flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
						>
							<Save className='h-4 w-4' />
							Save Changes
						</button>
						<button
							type='button'
							onClick={handleCancel}
							className='flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
						>
							<X className='h-4 w-4' />
							Cancel
						</button>
					</div>
				</div>
			</section>

			{/* Account Settings */}
			<section>
				<div className='mb-4 flex items-center gap-2'>
					<Settings className='h-5 w-5 text-zinc-700 dark:text-zinc-300' />
					<h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
						Account Settings
					</h2>
				</div>
				<div className='space-y-4'>
					<div>
						<label
							htmlFor='language'
							className='mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300'
						>
							Language
						</label>
						<select
							id='language'
							value={language}
							onChange={e => setLanguage(e.target.value)}
							className='w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500'
						>
							<option value='English'>English</option>
							<option value='Spanish'>Spanish</option>
							<option value='Portuguese'>Portuguese</option>
						</select>
					</div>
					<div className='flex items-center gap-3'>
						<input
							id='email-notifications'
							type='checkbox'
							checked={emailNotifications}
							onChange={e => setEmailNotifications(e.target.checked)}
							className='h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800'
						/>
						<label
							htmlFor='email-notifications'
							className='text-sm font-medium text-zinc-700 dark:text-zinc-300'
						>
							Email Notifications
						</label>
						<span className='text-sm text-zinc-500 dark:text-zinc-400'>
							Property Updates
						</span>
					</div>
					<button
						type='button'
						className='text-sm font-medium text-zinc-900 underline hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300'
					>
						Change Password
					</button>
				</div>
			</section>

			{/* Investment Recommendations */}
			{/*<section>
				<div className='mb-4 flex items-center gap-2'>
					<TrendingUp className='h-5 w-5 text-zinc-700 dark:text-zinc-300' />
					<h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
						Investment Recommendations
					</h2>
				</div>
				<div className='grid gap-4 md:grid-cols-2'>
					{recommendations.map((project, index) => {
						const score = getInvestmentScore(index)
						const roi = getROI(index)
						const trend = getMarketTrend(index)
						const description = getDescription(project, index)

						return (
							<div
								key={project.id}
								className='rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950'
							>
								<h3 className='mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50'>
									{project.title}
								</h3>
								<div className='mb-3 space-y-2 text-sm'>
									<div className='flex items-center justify-between'>
										<span className='text-zinc-600 dark:text-zinc-400'>
											ROI Potential:
										</span>
										<span className='font-medium text-zinc-900 dark:text-zinc-50'>
											{roi}
										</span>
									</div>
									<p className='text-zinc-600 dark:text-zinc-400'>
										{description}
									</p>
									<div className='flex items-center justify-between'>
										<span className='text-zinc-600 dark:text-zinc-400'>
											Market Trend:
										</span>
										<span className='font-medium text-zinc-900 dark:text-zinc-50'>
											{trend}
										</span>
									</div>
								</div>
								<div className='mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400'>
									Investment Score: {score}/100
								</div>
							</div>
						)
					})}
				</div>
			</section>*/}
		</div>
	)
}


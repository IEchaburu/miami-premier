'use client'

import { MessageCircle, Phone } from 'lucide-react'

export function ContactSection () {
	function handleWhatsApp () {
		// TODO: Replace with actual WhatsApp number
		const phoneNumber = '+1234567890'
		const message = encodeURIComponent('Hello, I am interested in this property.')
		window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
	}

	function handleCall () {
		// TODO: Replace with actual phone number
		const phoneNumber = '+1234567890'
		window.location.href = `tel:${phoneNumber}`
	}

	return (
		<div className='space-y-3 sm:space-y-4'>
			<h2 className='text-base font-semibold text-zinc-900 sm:text-lg'>
				Contact an Advisor
			</h2>
			<div className='flex flex-col gap-2 sm:gap-3'>
				<button
					type='button'
					onClick={handleWhatsApp}
					className='flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 sm:px-6 sm:py-3'
				>
					<MessageCircle className='h-4 w-4 sm:h-5 sm:w-5' />
					WhatsApp
				</button>
				<button
					type='button'
					onClick={handleCall}
					className='flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 sm:px-6 sm:py-3'
				>
					<Phone className='h-4 w-4 sm:h-5 sm:w-5' />
					Call Now
				</button>
			</div>
		</div>
	)
}


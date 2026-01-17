'use client'

import { useState } from 'react'
import { Phone, Mail, Calendar } from 'lucide-react'

interface ContactSectionProps {
	developmentName: string
}

export function ContactSection ({ developmentName }: ContactSectionProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	})

	function handleSubmit (e: React.FormEvent) {
		e.preventDefault()
		// TODO: Implement form submission to API
		console.log('Form submitted:', formData)
	}

	function handleChange (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<section className='bg-neutral-900 px-8 py-24 text-white md:px-16 lg:px-24'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-16 text-center'>
					<h2 className='mb-4 text-4xl font-bold tracking-tight md:text-5xl'>
						Schedule Your Private Tour
					</h2>
					<p className='text-lg text-neutral-400'>
						Experience {developmentName} in person
					</p>
				</div>

				<div className='grid gap-12 lg:grid-cols-2'>
					{/* Contact Information */}
					<div>
						<h3 className='mb-8 text-2xl font-semibold'>Get in Touch</h3>

						<div className='space-y-6'>
							<div className='flex items-start gap-4'>
								<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center border border-white/20'>
									<Phone className='h-6 w-6' />
								</div>
								<div>
									<div className='mb-1 text-sm uppercase tracking-wider text-neutral-400'>
										Phone
									</div>
									<a
										href='tel:+13055551234'
										className='text-lg transition hover:text-neutral-300'
									>
										+1 (305) 555-1234
									</a>
								</div>
							</div>

							<div className='flex items-start gap-4'>
								<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center border border-white/20'>
									<Mail className='h-6 w-6' />
								</div>
								<div>
									<div className='mb-1 text-sm uppercase tracking-wider text-neutral-400'>
										Email
									</div>
									<a
										href='mailto:sales@example.com'
										className='text-lg transition hover:text-neutral-300'
									>
										sales@example.com
									</a>
								</div>
							</div>

							<div className='flex items-start gap-4'>
								<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center border border-white/20'>
									<Calendar className='h-6 w-6' />
								</div>
								<div>
									<div className='mb-1 text-sm uppercase tracking-wider text-neutral-400'>
										Sales Gallery Hours
									</div>
									<div className='text-lg'>Monday - Sunday</div>
									<div className='text-neutral-400'>10:00 AM - 6:00 PM</div>
								</div>
							</div>
						</div>

						<div className='mt-12 border-t border-white/20 pt-12'>
							<h4 className='mb-4 text-xl font-semibold'>Sales Gallery Address</h4>
							<p className='text-neutral-400'>
								1200 Brickell Avenue<br />
								Miami, FL 33131<br />
								United States
							</p>
						</div>
					</div>

					{/* Contact Form */}
					<div>
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div>
								<label
									htmlFor='name'
									className='mb-2 block text-sm uppercase tracking-wider text-neutral-400'
								>
									Full Name *
								</label>
								<input
									type='text'
									id='name'
									name='name'
									value={formData.name}
									onChange={handleChange}
									required
									className='w-full border border-white/20 bg-transparent px-4 py-3 text-white placeholder-neutral-500 transition focus:border-white focus:outline-none'
									placeholder='John Doe'
								/>
							</div>

							<div>
								<label
									htmlFor='email'
									className='mb-2 block text-sm uppercase tracking-wider text-neutral-400'
								>
									Email Address *
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									required
									className='w-full border border-white/20 bg-transparent px-4 py-3 text-white placeholder-neutral-500 transition focus:border-white focus:outline-none'
									placeholder='john@example.com'
								/>
							</div>

							<div>
								<label
									htmlFor='phone'
									className='mb-2 block text-sm uppercase tracking-wider text-neutral-400'
								>
									Phone Number
								</label>
								<input
									type='tel'
									id='phone'
									name='phone'
									value={formData.phone}
									onChange={handleChange}
									className='w-full border border-white/20 bg-transparent px-4 py-3 text-white placeholder-neutral-500 transition focus:border-white focus:outline-none'
									placeholder='+1 (305) 555-0000'
								/>
							</div>

							<div>
								<label
									htmlFor='message'
									className='mb-2 block text-sm uppercase tracking-wider text-neutral-400'
								>
									Message
								</label>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleChange}
									rows={4}
									className='w-full border border-white/20 bg-transparent px-4 py-3 text-white placeholder-neutral-500 transition focus:border-white focus:outline-none'
									placeholder={`I'm interested in learning more about ${developmentName}...`}
								/>
							</div>

							<button
								type='submit'
								className='w-full border-2 border-white bg-white px-8 py-4 font-medium text-neutral-900 transition hover:bg-transparent hover:text-white'
							>
								Request Information
							</button>

							<p className='text-sm text-neutral-500'>
								By submitting this form, you agree to our privacy policy and consent to be
								contacted by our sales team.
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}



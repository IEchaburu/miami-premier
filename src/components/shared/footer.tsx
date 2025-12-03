import Link from 'next/link'

function Footer () {
	return (
		<footer className='border-t border-zinc-200 bg-zinc-50'>
			<div className='mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 md:flex-row md:items-start md:justify-between'>
				<div className='max-w-md space-y-3'>
					<h3 className='text-sm font-semibold tracking-tight text-zinc-900'>
						Miami Premier
					</h3>
					<p className='text-sm text-zinc-600'>
						Your trusted partner for luxury pre-construction developments
						in Miami. We connect you with the city&apos;s most exclusive
						properties and provide expert guidance throughout your
						investment journey.
					</p>
					<button
						type='button'
						className='inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-medium text-zinc-800 shadow-sm hover:bg-zinc-50'
					>
						<span>Sign In</span>
					</button>
				</div>

				<div className='flex flex-1 flex-col gap-8 md:flex-row md:justify-end'>
					<div className='space-y-3 text-sm'>
						<h4 className='font-semibold tracking-tight text-zinc-900'>
							Contact Us
						</h4>
						<ul className='space-y-2 text-zinc-600'>
							<li>+1 (305) 123-4567</li>
							<li>info@miamipremier.com</li>
							<li>Brickell Ave, Miami, FL</li>
						</ul>
					</div>

					<div className='space-y-3 text-sm'>
						<h4 className='font-semibold tracking-tight text-zinc-900'>
							Stay Updated
						</h4>
						<p className='text-zinc-600'>
							Get notified about new developments and exclusive
							opportunities.
						</p>
						<form className='flex max-w-xs gap-2'>
							<input
								type='email'
								placeholder='Your email address'
								className='h-9 flex-1 rounded-full border border-zinc-300 bg-white px-3 text-xs text-zinc-800 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/5'
							/>
							<button
								type='submit'
								className='inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 text-xs font-medium text-white hover:bg-zinc-800'
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>
			</div>

			<div className='border-t border-zinc-200 bg-zinc-50'>
				<div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-zinc-500 md:flex-row'>
					<p>© 2025 Miami Premier. All rights reserved.</p>
					<div className='flex items-center gap-4'>
						<Link href='#'>Privacy Policy</Link>
						<span className='text-zinc-300'>|</span>
						<Link href='#'>Terms of Service</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export { Footer }

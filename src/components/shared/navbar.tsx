import Link from 'next/link'

interface NavbarProps {
	isAuthenticated?: boolean
}

function Navbar ({ isAuthenticated }: NavbarProps) {
	return (
		<header className='border-b border-zinc-200 bg-white/80 backdrop-blur'>
			<div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4'>
				<div className='flex items-center gap-2'>
					<Link href='/' className='flex items-center gap-2'>
						<div className='flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white'>
							<span>MP</span>
						</div>
						<div className='flex flex-col leading-tight'>
							<span className='text-sm font-semibold tracking-tight text-zinc-900'>
								Miami Premier
							</span>
							<span className='text-xs text-zinc-500'>
								Luxury Developments
							</span>
						</div>
					</Link>
				</div>

				<nav className='hidden items-center gap-6 text-sm font-medium text-zinc-700 md:flex'>
					<Link href='/developments' className='hover:text-zinc-900'>
						Developments
					</Link>
					<Link href='/neighborhoods' className='hover:text-zinc-900'>
						Neighborhoods
					</Link>
					<Link href='/news' className='hover:text-zinc-900'>
						News
					</Link>
				</nav>

				<div className='flex flex-1 items-center justify-end gap-4'>
					<form className='hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-500 md:flex'>
						<input
							type='search'
							placeholder='Search properties...'
							className='h-7 w-full border-0 bg-transparent text-xs text-zinc-700 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-0'
						/>
					</form>
					<button
						type='button'
						className='relative hidden h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-xs font-medium text-zinc-700 md:inline-flex'
					>
						<span className='absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-semibold text-white'>
							0
						</span>
						<span>♥</span>
					</button>
					<div className='hidden items-center gap-3 text-sm md:flex'>
						<button
							type='button'
							className='text-zinc-700 hover:text-zinc-900'
						>
							Sell
						</button>
						<span className='text-zinc-300'>|</span>
						{isAuthenticated ? (
							<Link
								href='/profile'
								className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white hover:bg-zinc-800'
								aria-label='Go to profile'
							>
								<span>P</span>
							</Link>
						) : (
							<Link
								href='/sign-in'
								className='text-zinc-900 hover:underline'
							>
								Login
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export { Navbar }

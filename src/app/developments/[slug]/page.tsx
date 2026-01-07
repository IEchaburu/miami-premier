import { notFound } from 'next/navigation'
import { getServerSession } from '@/lib/get-session'
import { Navbar } from '@/components/shared/navbar'
import { ImageCarousel } from './components/image-carousel'
import { ProjectDetails } from './components/project-details'
import { ContactSection } from './components/contact-section'
import { AmenitiesSection } from './components/amenities-section'
import { FloorPlansSection } from './components/floor-plans-section'

interface PageProps {
	params: Promise<{ slug: string }>
}

async function getProject (slug: string) {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
	try {
		const response = await fetch(`${baseUrl}/api/projects/${slug}`, {
			cache: 'no-store',
		})

		if (!response.ok) {
			return null
		}

		const data = await response.json()
		return data.project
	} catch (error) {
		console.error('Error fetching project:', error)
		return null
	}
}

export default async function DevelopmentDetailPage ({
	params,
}: PageProps) {
	const { slug } = await params
	const session = await getServerSession()
	const project = await getProject(slug)

	if (!project) {
		notFound()
	}

	// Filter media by kind
	const images = (project.project_media || []).filter(
		(media: { kind: string | null }) => media.kind === 'image' || !media.kind
	)
	const floorPlans = (project.project_media || []).filter(
		(media: { kind: string | null }) => media.kind === 'floor_plan'
	)

	return (
		<div className='min-h-screen bg-white'>
			<Navbar isAuthenticated={!!session?.user} />
			<main className='mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10'>
				{/* Two Column Layout - Stacks on mobile/tablet */}
				<div className='grid w-full grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12'>
					{/* Left Column: Image Carousel */}
					<div className='w-full'>
						<ImageCarousel images={images} title={project.title} />
					</div>

					{/* Right Column: Details and Actions */}
					<div className='w-full space-y-8'>
						<ProjectDetails
							project={{
								...project,
								id: project.id,
							}}
							isAuthenticated={!!session?.user}
						/>
						<ContactSection />
					</div>
				</div>

				{/* Full Width Description Section */}
				{(project.description_md || project.short_description) && (
					<div className='mt-8 border-t border-zinc-200 pt-8 sm:mt-12 sm:pt-12'>
						<h2 className='mb-4 text-xl font-semibold text-zinc-900 sm:mb-6 sm:text-2xl'>
							Description
						</h2>
						<div className='prose prose-zinc max-w-none'>
							{project.description_md ? (
								<p className='text-base leading-relaxed text-zinc-700 sm:text-lg'>
									{project.description_md}
								</p>
							) : (
								project.short_description && (
									<p className='text-base leading-relaxed text-zinc-700 sm:text-lg'>
										{project.short_description}
									</p>
								)
							)}
						</div>
					</div>
				)}

				{/* Amenities Section */}
				{project.project_amenities && project.project_amenities.length > 0 && (
					<AmenitiesSection amenities={project.project_amenities} />
				)}

				{/* Floor Plans Section */}
				{floorPlans.length > 0 && (
					<FloorPlansSection floorPlans={floorPlans} />
				)}
			</main>
		</div>
	)
}

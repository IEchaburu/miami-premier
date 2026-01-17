import { notFound } from 'next/navigation'
import { getServerSession } from '@/lib/get-session'
import { Navbar } from '@/components/shared/navbar'
import { HeroSection } from './components/hero-section'
import { DevelopmentInfo } from './components/development-info'
import { GallerySection } from './components/gallery-section'
import { FloorPlansSection } from './components/floor-plans-section'
import { AmenitiesSection } from './components/amenities-section'
import { LocationSection } from './components/location-section'
import { ContactSection } from './components/contact-section'

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

	// Get first image for hero, remaining for gallery
	const heroImage = images.length > 0 ? images[0] : null
	const galleryImages = images.length > 1 ? images.slice(1) : images

	// Get feature image for amenities (use second image if available)
	const amenityFeatureImage = images.length > 1 ? images[1] : null

	// Build location string
	const locationText = [
		project.areas_barrios?.name,
		project.markets?.name,
	]
		.filter(Boolean)
		.join(', ')

	return (
		<div className='min-h-screen bg-white'>
			<Navbar isAuthenticated={!!session?.user} />

			{/* Hero Section */}
			{heroImage && (
				<HeroSection
					image={heroImage}
					title={project.title}
					tagline={project.short_description || null}
					location={locationText}
				/>
			)}

			{/* Development Info Section */}
			<DevelopmentInfo
				project={{
					...project,
					id: project.id,
				}}
				isAuthenticated={!!session?.user}
			/>

			{/* Gallery Section */}
			{galleryImages.length > 0 && (
				<GallerySection images={galleryImages} title={project.title} />
			)}

			{/* Floor Plans Section */}
			{floorPlans.length > 0 && (
				<FloorPlansSection floorPlans={floorPlans} />
			)}

			{/* Amenities Section */}
			{project.project_amenities && project.project_amenities.length > 0 && (
				<AmenitiesSection
					amenities={project.project_amenities}
					featureImage={amenityFeatureImage || null}
				/>
			)}

			{/* Location Section */}
			<LocationSection
				location={locationText}
				address={project.address || null}
				latitude={project.latitude || null}
				longitude={project.longitude || null}
			/>

			{/* Contact Section */}
			<ContactSection developmentName={project.title} />
		</div>
	)
}

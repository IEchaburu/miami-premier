/**
 * Helper function to convert media URLs to displayable image URLs
 * Handles Google Drive, S3, and direct URLs
 */
export function getImageUrl (media: {
	s3_bucket: string | null
	s3_key: string | null
}): string {
	const url = media.s3_bucket || media.s3_key || ''

	// For local file paths
	if (url.startsWith('/images/')) {
		return url
	}
	
	// If it's a Google Drive preview URL, convert to direct image URL
	if (url.includes('drive.google.com')) {
		const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
		if (fileIdMatch) {
			const fileId = fileIdMatch[1]
			return `https://drive.google.com/thumbnail?id=${fileId}&sz=w3000`
		}
	}

	// If it's already a full URL (starts with http)
	if (url.startsWith('http')) {
		return url
	}

	// If it's S3 format
	if (media.s3_bucket && media.s3_key) {
		return `https://${media.s3_bucket}.s3.amazonaws.com/${media.s3_key}`
	}

	// Fallback
	return '/placeholder-image.jpg'
}


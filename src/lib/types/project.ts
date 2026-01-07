export interface Project {
	id: number
	url: string | null
	title: string
	status: string | null
	price_usd: number | null
	property_type: string | null
	delivery_date: string | null
	address: string | null
	short_description: string | null
	description_md: string | null
	is_published: boolean | null
	markets: {
		id: number
		name: string
		code: string
		country: string
	} | null
	areas_barrios: {
		id: number
		name: string
	} | null
	project_media: Array<{
		id: number
		kind: string | null
		title: string | null
		alt: string | null
		s3_bucket: string | null
		s3_key: string | null
	}>
	project_amenities: Array<{
		amenities: {
			id: number
			name: string
			kind: string | null
			icon: string | null
		}
	}>
	project_tags: Array<{
		tags: {
			id: number
			name: string
		}
	}>
}
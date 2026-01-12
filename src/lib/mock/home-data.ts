export interface HeroProperty {
	id: string
	title: string
	location: string
	description: string
	priceFrom: string
}

export interface HighlightTile {
	id: string
	title: string
	subtitle: string
	href: string
}

export interface Development {
	id: string
	name: string
	status: string
	country: string
	location: string
	priceFrom: string
	imageAlt: string
}

export interface Neighborhood {
	id: string
	name: string
	tagline: string
	developments: number
	averagePrice: string
	priceFrom: string
	features: string[]
	imageAlt: string
}

export const heroProperties: HeroProperty[] = [
	{
		id: 'rivage-bal-harbor',
		title: 'Rivage Bal Harbor',
		location: 'Bal Harbor, Miami',
		description: 'Luxury waterfront condominium in the heart of Bal Harbor',
		priceFrom: 'from $10,000,000',
	},
]

export const highlightTiles: HighlightTile[] = [
	{
		id: 'most-exclusive',
		title: 'Most exclusive of the month',
		subtitle: 'Luxury developments',
		href: '/developments/luxury',
	},
	{
		id: 'most-consulted',
		title: 'Most consulted of the month',
		subtitle: 'Pre-construction projects',
		href: '/developments/pre-construction',
	},
	{
		id: 'latest-launches',
		title: 'Latest launches',
		subtitle: 'New projects',
		href: '/developments/new-launches',
	},
]

export const featuredDevelopments: Development[] = [
	{
		id: 'brickell-heights-tower',
		name: 'Brickell Heights Tower',
		status: 'Pre-Construction',
		country: 'Estados Unidos',
		location: 'Brickell, Miami',
		priceFrom: 'from $650,000',
		imageAlt: 'Brickell Heights Tower',
	},
	{
		id: 'ocean-drive-residences',
		name: 'Ocean Drive Residences',
		status: 'Pre-Construction',
		country: 'Uruguay',
		location: 'Playa Brava, Punta del Este',
		priceFrom: 'from $280,000',
		imageAlt: 'Ocean Drive Residences',
	},
	{
		id: 'polanco-elite-tower',
		name: 'Polanco Elite Tower',
		status: 'Pre-Construction',
		country: 'México',
		location: 'Polanco, Ciudad de México',
		priceFrom: 'from $350,000',
		imageAlt: 'Polanco Elite Tower',
	},
	{
		id: 'salamanca-luxury-residences',
		name: 'Salamanca Luxury Residences',
		status: 'Pre-Construction',
		country: 'España',
		location: 'Salamanca, Madrid',
		priceFrom: 'from €450,000',
		imageAlt: 'Salamanca Luxury Residences',
	},
]

export const miamiNeighborhoods: Neighborhood[] = [
	{
		id: 'bay-harbor',
		name: 'Bay Harbor Islands',
		tagline: 'Island Living',
		developments: 2,
		averagePrice: 'Avg: $1M',
		priceFrom: 'From $600K',
		features: ['Marina Access', 'Golf Course'],
		imageAlt: 'Bay Harbor Islands',
	},
	{
		id: 'brickell',
		name: 'Brickell',
		tagline: 'Financial District',
		developments: 2,
		averagePrice: 'Avg: $925K',
		priceFrom: 'From $650K',
		features: ['Financial District', 'High-rise Living'],
		imageAlt: 'Brickell',
	},
	{
		id: 'coconut-grove',
		name: 'Coconut Grove',
		tagline: 'Historic Charm',
		developments: 2,
		averagePrice: 'Avg: $875K',
		priceFrom: 'From $500K',
		features: ['Historic District', 'Marina'],
		imageAlt: 'Coconut Grove',
	},
	{
		id: 'downtown-miami',
		name: 'Downtown Miami',
		tagline: 'Urban Core',
		developments: 2,
		averagePrice: 'Avg: $725K',
		priceFrom: 'From $450K',
		features: ['City Center', 'Transit Hub'],
		imageAlt: 'Downtown Miami',
	},
	{
		id: 'edgewater',
		name: 'Edgewater',
		tagline: 'Bayfront Luxury',
		developments: 2,
		averagePrice: 'Avg: $1.15M',
		priceFrom: 'From $600K',
		features: ['Bay Views', 'Marina'],
		imageAlt: 'Edgewater',
	},
	{
		id: 'miami-beach',
		name: 'Miami Beach',
		tagline: 'Oceanfront Living',
		developments: 2,
		averagePrice: 'Avg: $1.8M',
		priceFrom: 'From $900K',
		features: ['Ocean Access', 'Beach Lifestyle'],
		imageAlt: 'Miami Beach',
	},
]


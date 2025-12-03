import { HeroSection } from './components/hero-section'
import { KeyBenefits } from './components/key-benefits'
import { PropertyCategories } from './components/property-categories'
import { HighlightTiles } from './components/highlight-titles'
import { FeaturedDevelopmentsGrid } from './components/featured-developments-grid'
import { MiamiNeighborhoodsCarousel } from './components/miami-neighborhoods-carousel'
import { FeaturedStrip } from './components/featured-strip'

export default function Home () {
	return (
		<>
			<HeroSection />
			<KeyBenefits />
			<PropertyCategories />
			<HighlightTiles />
			<FeaturedDevelopmentsGrid />
			<MiamiNeighborhoodsCarousel />
			<FeaturedStrip />
		</>
	)
}



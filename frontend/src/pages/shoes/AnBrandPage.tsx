import { useParams } from 'react-router-dom'
// Components
import Loading from '../../components/Loading.tsx'
import ShoeCard from '../../components/ShoeCard.tsx'
import ShoeCardsContainer from '../../components/ShoeCardsContainer.tsx'
// Functions
import { changeTitle } from '../../functions/Functions.ts'
// Hooks
import { useBrands, useShoesByBrand } from '../../hooks/Hooks.ts'
// Style
import '../../styles/pages/shoes/AnBrandPage.css'

const AnBrandPage = () => {
    const { brand: brandName } = useParams()
    const { shoes, isLoading: isShoesLoading } = useShoesByBrand(brandName!)
    const { brands, isLoading: isBrandsLoading } = useBrands()

    if (isShoesLoading || isBrandsLoading) {
        return <Loading />
    }

    changeTitle(`${brandName!.charAt(0).toUpperCase() + brandName!.slice(1)}`)

    return (
        <div id='brand-page'>
            <ShoeCardsContainer>
                {shoes!.map((shoe, i) => {
                    return (
                        <ShoeCard
                            shoe={shoe}
                            brand={
                                brands!.filter(
                                    (brand) => brand.id === shoe.brand_id
                                )[0]
                            }
                            key={`shoes-${i}`}
                        />
                    )
                })}
            </ShoeCardsContainer>
        </div>
    )
}

export default AnBrandPage

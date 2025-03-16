// Components
import ShoeCard from '../../components/ShoeCard.tsx'
import Loading from '../../components/Loading.tsx'
import ShoeCardsContainer from '../../components/ShoeCardsContainer.tsx'
// Functions
import { changeTitle } from '../../functions/Functions.ts'
// Hooks
import { useBrands, useShoes } from '../../hooks/Hooks.ts'
// Style
import '../../styles/pages/shoes/ShoesPage.css'

const ShoesPage = () => {
    const { shoes, isLoading: isShoesLoading } = useShoes()
    const { brands, isLoading: isBrandsLoading } = useBrands()

    if (isShoesLoading || isBrandsLoading) {
        return <Loading />
    }

    changeTitle('Shop All')

    return (
        <div id='shoes-page'>
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

export default ShoesPage

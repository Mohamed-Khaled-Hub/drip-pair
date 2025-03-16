import { useContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
// Components
import Button from '../../components/Button.tsx'
import Loading from '../../components/Loading.tsx'
// Contexts
import { UserContext } from '../../contexts/Contexts.ts'
// Functions
import {
    changeTitle,
    getFromAssets,
    shoeImageNameFormatter,
} from '../../functions/Functions.ts'
// Hooks
import { useBrands, useShoe } from '../../hooks/Hooks.ts'
// Style
import '../../styles/pages/shoes/AnShoePage.css'

const AnShoePage = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const { user, loggedIn, addToCart } = useContext(UserContext)
    // Shoes & Brand
    const { shoe: shoeId } = useParams()
    const { shoe, isLoading: isShoesLoading } = useShoe(Number(shoeId))
    const { brands, isLoading: isBrandsLoading } = useBrands()
    // States for current selected color & size
    const [currentColor, setCurrentColor] = useState(0)
    const [currentSize, setCurrentSize] = useState(0)

    if (isShoesLoading || isBrandsLoading) {
        return <Loading />
    }

    const shoeBrand = brands?.filter((brand) => brand.id === shoe?.brand_id)[0]
    const shoeImages = shoe?.colors.map((color) =>
        shoeImageNameFormatter(shoe?.name, color.name)
    )

    changeTitle(`${shoe?.name}`)

    return (
        <div id='an-shoe-page'>
            <div className='left'>
                <img
                    src={getFromAssets(
                        `brands/${shoeBrand!.name}/Shoes/${shoeImages![currentColor]}.avif`
                    )}
                    alt={shoe?.name}
                />
            </div>
            <div className='right'>
                {/* Shoe */}
                <section>
                    <h1>Shoe Info</h1>
                    <div id='shoe-id' className='info-field'>
                        <p className='identifier'>Shoe ID</p>
                        <p>{shoe!.id}</p>
                    </div>
                    <div id='shoe-name' className='info-field'>
                        <p className='identifier'>Name</p>
                        <p>{shoe!.name}</p>
                    </div>
                    <div id='shoe-price' className='info-field'>
                        <p className='identifier'>Price</p>
                        <p>${shoe!.price}</p>
                    </div>
                    <div id='shoe-sizes' className='info-field'>
                        <p className='identifier'>Sizes</p>
                        <div className='sizes-container'>
                            {shoe!.sizes.map((size, index) => (
                                <div
                                    className={`a-size-container${index === currentSize ? ' current-size' : ''}`}
                                    onClick={() => {
                                        setCurrentSize(index)
                                    }}
                                    key={`size-${index}`}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id='shoe-colors' className='info-field'>
                        <p className='identifier'>Colors</p>
                        <div className='colors-container'>
                            {shoe!.colors.map((color, index) => (
                                <div
                                    className={`a-color-container${index === currentColor ? ' current-color' : ''}`}
                                    onClick={() => {
                                        setCurrentColor(index)
                                    }}
                                    key={index}
                                >
                                    {Object.values(color.colors).map(
                                        (hex, index) => (
                                            <div
                                                style={{ backgroundColor: hex }}
                                                key={index}
                                            ></div>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id='current-size-value' className='info-field'>
                        <p className='identifier'>Current Size</p>
                        <p>{shoe!.sizes[currentSize]}</p>
                    </div>
                    <div id='current-color-value' className='info-field'>
                        <p className='identifier'>Current Color</p>
                        <p>{shoe!.colors[currentColor].name}</p>
                    </div>
                </section>
                {/* Brand */}
                <section>
                    <h1>Brand Info</h1>
                    <div id='brand-id' className='info-field'>
                        <p className='identifier'>Brand ID</p>
                        <p>{shoe!.brand_id}</p>
                    </div>
                    <div id='brand-name' className='info-field'>
                        <p className='identifier'>Brand</p>
                        <p>{shoeBrand!.name}</p>
                    </div>
                    <div id='brand-founded' className='info-field'>
                        <p className='identifier'>Founded</p>
                        <p>{new Date(shoeBrand!.founded).getFullYear()}</p>
                    </div>
                    <div id='brand-founder' className='info-field'>
                        <p className='identifier'>Founder</p>
                        <p>{shoeBrand!.founder}</p>
                    </div>
                </section>
                {/* Refund Policy */}
                <section>
                    <h1>Refund Policy</h1>
                    <div id='refund-policy'>
                        <p>
                            We offer refund and/or exchange within the first 15
                            days of your purchase, if 15 days have passed since
                            your purchase, you will not be offered a refund
                            and/or exchange of any kind.
                        </p>
                    </div>
                </section>
                {/* Cart */}
                <section>
                    <form
                        ref={formRef}
                        onSubmit={(e) => {
                            e.preventDefault()
                            addToCart(
                                user?.id as number,
                                shoe?.id as number,
                                shoe?.colors[currentColor].id as number,
                                shoe?.sizes[currentSize] as number,
                                1
                            )
                                .then(() => {
                                    alert('Added to cart successfully.')
                                })
                                .catch(() => {
                                    alert('Could not add to cart.')
                                })
                        }}
                    ></form>
                    <Button
                        type='submit'
                        disabled={!loggedIn}
                        title={
                            loggedIn
                                ? 'Add to Cart'
                                : 'Login to add to your cart'
                        }
                        onClick={() => formRef.current?.requestSubmit()}
                    >
                        Add to Cart
                    </Button>
                </section>
            </div>
        </div>
    )
}

export default AnShoePage

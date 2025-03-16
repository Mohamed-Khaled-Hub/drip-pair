import { useContext } from 'react'
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
// Globals
import { BRANDS_ID_NAME } from '../../globals/Globals.ts'
// Hooks
import { useShoesByIds } from '../../hooks/Hooks.ts'
// Style
import '../../styles/pages/root/CartPage.css'

const CartPage = () => {
    const { user, checkout, removeFromCart } = useContext(UserContext)
    const shoeIds = user?.cart?.map((cartItem) => cartItem.productId) || []
    const { shoes, isLoading } = useShoesByIds(shoeIds)

    if (isLoading) {
        return <Loading />
    }

    const totalPrice =
        user?.cart?.reduce((acc, cartItem) => {
            const shoe = shoes?.find(
                (shoe) =>
                    shoe.id === cartItem.productId &&
                    shoe.colors.some((color) => color.id === cartItem.colorId)
            )
            return acc + (shoe ? shoe.price * cartItem.quantity : 0)
        }, 0) || 0

    const totalItems = user?.cart?.length

    changeTitle('Cart')

    return (
        <div id='cart-page'>
            {user?.cart?.length === 0 ? (
                <div className='empty-cart'>
                    <h1>Empty</h1>
                </div>
            ) : (
                <>
                    <section className='cart'>
                        {user?.cart?.map((cartItem, index) => {
                            const shoe = shoes?.find(
                                (shoe) => shoe.id === cartItem.productId
                            )

                            if (!shoe) return null

                            const brand = BRANDS_ID_NAME.find(
                                (brand) => brand.id === shoe.brand_id
                            )
                            const shoeColorObj = shoe.colors.find(
                                (color) => color.id === cartItem.colorId
                            )
                            const shoeSize = cartItem.size

                            if (!brand || !shoeColorObj) return null

                            const shoeImage = shoeImageNameFormatter(
                                shoe.name,
                                shoeColorObj.name
                            )

                            return (
                                <div
                                    className='an-shoe'
                                    key={`${cartItem.productId}-${cartItem.colorId}-${cartItem.size}-${index}`}
                                >
                                    <div className='image'>
                                        <img
                                            src={getFromAssets(
                                                `brands/${brand.name}/Shoes/${shoeImage}.avif`
                                            )}
                                            alt={shoe.name}
                                        />
                                    </div>
                                    <div className='info'>
                                        <h1>{shoe.name}</h1>
                                        <h2>${shoe.price}</h2>
                                        <p>{shoeColorObj.name}</p>
                                        <p>Size {shoeSize}</p>
                                        <p>Quantity {cartItem.quantity}</p>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            removeFromCart(
                                                user?.id as number,
                                                cartItem.productId as number,
                                                cartItem.colorId as number,
                                                cartItem.size as number
                                            ).then(() => {
                                                alert('Removed')
                                            })
                                        }}
                                    >
                                        <img
                                            src={getFromAssets(
                                                'svg/Delete.svg'
                                            )}
                                            alt='Remove from cart'
                                        />
                                    </Button>
                                </div>
                            )
                        })}
                    </section>
                    <section className='invoice'>
                        <div className='invoice-container'>
                            <h1>Invoice</h1>
                            <p>
                                Total Items: <strong>{totalItems}</strong>
                            </p>
                            <p>
                                Total Price:{' '}
                                <strong>${totalPrice.toFixed(2)}</strong>
                            </p>
                            <Button
                                onClick={() =>
                                    checkout(user?.id as number).then(() => {
                                        alert(
                                            'Checkout successful, cart has been cleared.'
                                        )
                                    })
                                }
                            >
                                Checkout
                            </Button>
                        </div>
                    </section>
                </>
            )}
        </div>
    )
}

export default CartPage

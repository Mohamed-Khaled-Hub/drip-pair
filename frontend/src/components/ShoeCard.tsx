import { useState } from 'react'
import { Link } from 'react-router-dom'
// Function
import {
    getFromAssets,
    shoeImageNameFormatter,
} from '../functions/Functions.ts'
// Types
import { ShoeCardProps } from '../types/Types.ts'
// Style
import '../styles/components/ShoeCard.css'

const ShoeCard = ({ shoe, brand }: ShoeCardProps) => {
    // State for the index of the last image that the user hovered on
    const [currentImage, setCurrentImage] = useState(0)
    // Map on shoe colors to get the name format of the shoe image
    const shoeImages = shoe.colors.map((color) =>
        shoeImageNameFormatter(shoe.name, color.name)
    )

    return (
        <Link
            to={`/shoes/${brand.name.toLowerCase()}/${shoe.id}`}
            className='shoe-card'
        >
            {shoeImages !== undefined && (
                <>
                    <div className='top'>
                        <img
                            src={getFromAssets(
                                `brands/${brand.name}/Shoes/${shoeImages[currentImage]}.avif`
                            )}
                            alt='Shoe'
                        />
                    </div>
                    <div className='bottom'>
                        <h1>{shoe.name}</h1>
                        <h2>${shoe.price}</h2>
                        <div className='colors'>
                            {shoe.colors.map((color, index) => (
                                <div
                                    className='color-container'
                                    onMouseOver={() => {
                                        setCurrentImage(index)
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
                </>
            )}
        </Link>
    )
}

export default ShoeCard

import { PropsWithChildren } from 'react'
// Style
import '../styles/components/ShoeCardsContainer.css'

const ShoeCardsContainer = ({ children }: PropsWithChildren) => {
    return <div className='shoe-cards-container'>{children}</div>
}

export default ShoeCardsContainer

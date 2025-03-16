import { useContext } from 'react'
// Components
import Container from './Container.tsx'
// Contexts
import { WebsiteInfoContext } from '../contexts/Contexts.ts'
// Functions
import { getFromAssets } from '../functions/Functions.ts'
// Style
import '../styles/components/Footer.css'

const Footer = () => {
    const { websiteTitle } = useContext(WebsiteInfoContext)

    return (
        <footer>
            <Container>
                <div className='top'>
                    <div className='logo-container'>
                        <img src={getFromAssets('logo/logo.svg')} alt='Logo' />
                    </div>
                    <p>Unleash Your Style with Every Step</p>
                </div>
                <div className='bottom'>
                    <div className='left'>
                        {`© ${new Date().getFullYear()} All Rights Reserved - ${websiteTitle.toUpperCase()}`}
                    </div>
                    <div className='right'></div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer

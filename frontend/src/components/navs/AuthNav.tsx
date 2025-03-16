import { Link } from 'react-router-dom'
// Components
import Container from '../Container.tsx'
// Functions
import { getFromAssets } from '../../functions/Functions.ts'
// Style
import '../../styles/components/navs/AuthNav.css'

const AuthNav = () => {
    return (
        <nav id='auth-nav'>
            <Container>
                <div className='left-gap'></div>
                <div className='left'>
                    <Link to='/'>
                        <img src={getFromAssets('logo/logo.svg')} alt='Logo' />
                    </Link>
                </div>
            </Container>
        </nav>
    )
}

export default AuthNav

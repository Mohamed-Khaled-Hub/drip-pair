import { useContext } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
// Components
import Container from '../Container.tsx'
// Contexts
import {
    IsMenuOpenedContext,
    UserContext,
    WebsiteInfoContext,
} from '../../contexts/Contexts.ts'
// Functions
import { getFromAssets } from '../../functions/Functions.ts'
// Style
import '../../styles/components/navs/RootNav.css'

const RootNav = () => {
    const [isMenuOpened, setIsMenuOpened] =
        useContext(IsMenuOpenedContext).isMenuOpened
    // Hook to redirect to other pages
    const navigate = useNavigate()
    const { user, loggedIn, logout } = useContext(UserContext)
    // Routing of the website to show it in nav
    const links = useContext(WebsiteInfoContext).routing
    const currentPage = useLocation().pathname

    return (
        <nav id='root-nav'>
            <Container>
                <div className='left-gap'></div>
                <div className='left'>
                    <Link to='/'>
                        <img src={getFromAssets('logo/logo.svg')} alt='Logo' />
                    </Link>
                </div>
                <div className='mid'>
                    {links.map((link, i) => {
                        return (
                            link.inNav &&
                            link.loggedIn === undefined &&
                            link.hidden === undefined &&
                            (link.path === '/shoes' ? (
                                currentPage === link.path ? (
                                    <NavLink to={link.path} key={i}>
                                        {link.title}
                                    </NavLink>
                                ) : (
                                    <Link to={link.path} key={i}>
                                        {link.title}
                                    </Link>
                                )
                            ) : (
                                <NavLink to={link.path} key={i}>
                                    {link.title}
                                </NavLink>
                            ))
                        )
                    })}
                </div>
                <div className='right'>
                    {loggedIn ? (
                        <>
                            {links.map((link, i) => {
                                return (
                                    link.loggedIn &&
                                    link.inNav === undefined &&
                                    link.hidden === undefined && (
                                        <Link
                                            to={link.path}
                                            key={i}
                                            className='logged-in'
                                        >
                                            <img
                                                src={getFromAssets(
                                                    `svg/${link.title}.svg`
                                                )}
                                                alt={link.title + ' Image'}
                                            />
                                            {link.title === 'Cart' && (
                                                <p>{user?.cart?.length}</p>
                                            )}
                                        </Link>
                                    )
                                )
                            })}
                            <button
                                className='logged-in'
                                onClick={() => {
                                    logout()
                                    navigate('/')
                                }}
                            >
                                <img
                                    src={getFromAssets('svg/Logout.svg')}
                                    alt='Logout Image'
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            {links.map((link, i) => {
                                return (
                                    !link.loggedIn &&
                                    link.inNav === undefined &&
                                    link.hidden === undefined && (
                                        <Link to={link.path} key={i}>
                                            {link.title}
                                        </Link>
                                    )
                                )
                            })}
                        </>
                    )}
                    <button
                        id='menu-toggle'
                        onClick={() => setIsMenuOpened(!isMenuOpened)}
                    >
                        <img
                            src={getFromAssets('svg/Menu Open.svg')}
                            alt='Menu Image'
                        />
                    </button>
                </div>
            </Container>
        </nav>
    )
}

export default RootNav

import { useContext } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
// Components
import Button from './Button.tsx'
// Contexts
import {
    UserContext,
    WebsiteInfoContext,
    IsMenuOpenedContext,
} from '../contexts/Contexts.ts'
// Functions
import { getFromAssets } from '../functions/Functions.ts'
// Style
import '../styles/components/Sidebar.css'

const Sidebar = () => {
    const [isMenuOpened, setIsMenuOpened] =
        useContext(IsMenuOpenedContext).isMenuOpened
    // Hook to redirect to other pages
    const navigate = useNavigate()
    const user = useContext(UserContext)
    // Routing of the website to show it in nav
    const links = useContext(WebsiteInfoContext).routing
    const currentPage = useLocation().pathname

    return (
        <div id='sidebar-utils'>
            <div
                id='black-screen'
                onClick={() => setIsMenuOpened(!isMenuOpened)}
                style={{
                    visibility: isMenuOpened ? 'visible' : 'hidden',
                }}
            ></div>
            <div
                id='sidebar'
                style={{
                    visibility: isMenuOpened ? 'visible' : 'hidden',
                }}
            >
                <div id='sidebar-container'>
                    <div className='top'>
                        <div onClick={() => setIsMenuOpened(!isMenuOpened)}>
                            <img
                                src={getFromAssets('svg/Menu Close.svg')}
                                alt='Close Menu'
                            />
                        </div>
                    </div>
                    <div className='mid'>
                        {links.map((link, i) => {
                            return (
                                link.inNav &&
                                link.loggedIn === undefined &&
                                link.hidden === undefined &&
                                (link.path === '/shoes' ? (
                                    currentPage === link.path ? (
                                        <NavLink
                                            to={link.path}
                                            key={i}
                                            onClick={() =>
                                                setIsMenuOpened(!isMenuOpened)
                                            }
                                        >
                                            {link.title}
                                        </NavLink>
                                    ) : (
                                        <Link
                                            to={link.path}
                                            key={i}
                                            onClick={() =>
                                                setIsMenuOpened(!isMenuOpened)
                                            }
                                        >
                                            {link.title}
                                        </Link>
                                    )
                                ) : (
                                    <NavLink
                                        to={link.path}
                                        key={i}
                                        onClick={() =>
                                            setIsMenuOpened(!isMenuOpened)
                                        }
                                    >
                                        {link.title}
                                    </NavLink>
                                ))
                            )
                        })}
                    </div>
                    <div className='bottom'>
                        {user.loggedIn ? (
                            <>
                                {links.map((link, i) => {
                                    return (
                                        link.loggedIn &&
                                        link.inNav === undefined &&
                                        link.hidden === undefined && (
                                            <Button
                                                type='link'
                                                to={link.path}
                                                key={i}
                                                onClick={() =>
                                                    setIsMenuOpened(
                                                        !isMenuOpened
                                                    )
                                                }
                                            >
                                                {link.title}
                                            </Button>
                                        )
                                    )
                                })}
                                <Button
                                    onClick={() => {
                                        user.logout()
                                        setIsMenuOpened(!isMenuOpened)
                                        navigate('/')
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                {links.map((link, i) => {
                                    return (
                                        !link.loggedIn &&
                                        link.inNav === undefined &&
                                        link.hidden === undefined && (
                                            <Button
                                                type='link'
                                                to={link.path}
                                                key={i}
                                                onClick={() =>
                                                    setIsMenuOpened(
                                                        !isMenuOpened
                                                    )
                                                }
                                            >
                                                {link.title}
                                            </Button>
                                        )
                                    )
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

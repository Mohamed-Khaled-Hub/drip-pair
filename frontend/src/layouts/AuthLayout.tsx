import { Outlet } from 'react-router-dom'
// Components
import AuthNav from '../components/navs/AuthNav.tsx'
import AuthMain from '../components/mains/AuthMain.tsx'

const AuthLayout = () => {
    return (
        <>
            <AuthNav />
            <AuthMain>
                <Outlet />
            </AuthMain>
        </>
    )
}

export default AuthLayout

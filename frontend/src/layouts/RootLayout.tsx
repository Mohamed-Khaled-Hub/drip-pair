import { Outlet } from 'react-router-dom'
// Components
import RootNav from '../components/navs/RootNav.tsx'
import RootMain from '../components/mains/RootMain.tsx'
import Footer from '../components/Footer.tsx'
import Sidebar from '../components/Sidebar.tsx'

const RootLayout = () => {
    return (
        <>
            <RootNav />
            <Sidebar />
            <RootMain>
                <Outlet />
            </RootMain>
            <Footer />
        </>
    )
}

export default RootLayout

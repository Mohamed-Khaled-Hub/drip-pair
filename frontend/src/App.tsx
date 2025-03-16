import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromChildren,
} from 'react-router-dom'
// Layouts
import RootLayout from './layouts/RootLayout.tsx'
import AuthLayout from './layouts/AuthLayout.tsx'
import ShoesLayout from './layouts/ShoesLayout.tsx'
import BrandLayout from './layouts/BrandLayout.tsx'
// Root Pages
import HomePage from './pages/root/HomePage.tsx'
import CartPage from './pages/root/CartPage.tsx'
import ProfilePage from './pages/root/ProfilePage.tsx'
// Shoes Pages
import ShoesPage from './pages/shoes/ShoesPage.tsx'
import AnBrandPage from './pages/shoes/AnBrandPage.tsx'
import AnShoePage from './pages/shoes/AnShoePage.tsx'
// Auth Pages
import LoginPage from './pages/auth/LoginPage.tsx'
import SignupPage from './pages/auth/SignupPage.tsx'
import ChangePasswordPage from './pages/auth/ChangePasswordPage.tsx'
// Error Pages
import AnBrandError from './pages/error/AnBrandError.tsx'
import AnShoeError from './pages/error/AnShoeError.tsx'
import PageNotFound from './pages/error/PageNotFound.tsx'
import ShoesError from './pages/error/ShoesError.tsx'
// Providers
import {
    UserProvider,
    WebsiteInfoProvider,
    QueryClientProvider,
    IsMenuOpenedProvider,
} from './providers/Providers.tsx'
// Style
import './styles/App.css'

const router = createBrowserRouter(
    createRoutesFromChildren(
        <>
            <Route path='/' element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path='cart' element={<CartPage />} />
                <Route path='profile' element={<ProfilePage />} />
            </Route>
            <Route path='shoes' element={<ShoesLayout />}>
                <Route
                    index
                    element={<ShoesPage />}
                    errorElement={<ShoesError />}
                />
                <Route path=':brand' element={<BrandLayout />}>
                    <Route
                        index
                        element={<AnBrandPage />}
                        errorElement={<AnBrandError />}
                    />
                    <Route
                        path=':shoe'
                        element={<AnShoePage />}
                        errorElement={<AnShoeError />}
                    />
                </Route>
            </Route>
            <Route path='auth' element={<AuthLayout />}>
                <Route path='login' element={<LoginPage />} />
                <Route path='signup' element={<SignupPage />} />
                <Route
                    path='change-password'
                    element={<ChangePasswordPage />}
                />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </>
    )
)

const App = () => {
    return (
        <QueryClientProvider>
            <UserProvider>
                <WebsiteInfoProvider>
                    <IsMenuOpenedProvider>
                        <RouterProvider router={router} />
                    </IsMenuOpenedProvider>
                </WebsiteInfoProvider>
            </UserProvider>
        </QueryClientProvider>
    )
}

export default App

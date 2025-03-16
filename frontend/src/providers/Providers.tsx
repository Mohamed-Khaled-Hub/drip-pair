import axios from 'axios'
import {
    QueryClient,
    QueryClientProvider as QueryProvider,
} from '@tanstack/react-query'
import { useState, useEffect, PropsWithChildren } from 'react'
// Contexts
import {
    IsMenuOpenedContext,
    UserContext,
    WebsiteInfoContext,
} from '../contexts/Contexts.ts'
// Globals
import { SERVER_ENDPOINT } from '../globals/Globals.ts'
// Types
import { UserType, WebsiteInfoContextType } from '../types/Types.ts'

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5000,
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
                refetchOnMount: false,
                retry: 0,
            },
            mutations: {
                retry: 0,
            },
        },
    })

    return <QueryProvider client={queryClient}>{children}</QueryProvider>
}

export const IsMenuOpenedProvider = ({ children }: PropsWithChildren) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    // Mobile Size State, to close menu if not in mobile size (640px)
    const [isMobileSize, setIsMobileSize] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobileSize(window.innerWidth < 640)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!isMobileSize) {
            setIsMenuOpened(false)
        }
    }, [isMobileSize])

    return (
        <IsMenuOpenedContext.Provider
            value={{ isMenuOpened: [isMenuOpened, setIsMenuOpened] }}
        >
            {children}
        </IsMenuOpenedContext.Provider>
    )
}

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<UserType | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const saveUser = (user: UserType) => {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const login = async (username: string, password: string) => {
        return await axios
            .post(`${SERVER_ENDPOINT}/users/login`, { username, password })
            .then((res) => {
                saveUser(res.data.user)
            })
            .catch((err) => {
                console.error('Login failed:', err)
                return Promise.reject(err)
            })
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const signup = async (userData: UserType) => {
        return await axios
            .post(`${SERVER_ENDPOINT}/users/signup`, userData)
            .then((res) => {
                const { username, password } = res.data.user
                login(username, password)
            })
            .catch((err) => {
                console.error('Signup failed:', err)
                return Promise.reject(err)
            })
    }

    const updateUser = async (id: number, userData: UserType) => {
        return await axios
            .put(`${SERVER_ENDPOINT}/users/${id}`, userData)
            .then((res) => {
                saveUser(res.data.user)
            })
            .catch((err) => {
                console.error('Update failed:', err)
                return Promise.reject(err)
            })
    }

    const deleteUser = async (id: number) => {
        return await axios
            .delete(`${SERVER_ENDPOINT}/users/${id}`)
            .then(() => {
                logout()
            })
            .catch((err) => {
                console.error('Delete failed:', err)
                return Promise.reject(err)
            })
    }

    const addToCart = async (
        userId: number,
        productId: number,
        colorId: number,
        size: number,
        quantity: number
    ) => {
        return await axios
            .put(`${SERVER_ENDPOINT}/users/add-to-cart/${userId}`, {
                productId,
                colorId,
                size,
                quantity,
            })
            .then((res) => {
                if (user) {
                    saveUser({ ...user, cart: res.data.cart })
                }
            })
            .catch((err) => {
                console.error('Add to cart failed:', err)
                return Promise.reject(err)
            })
    }

    const removeFromCart = async (
        userId: number,
        productId: number,
        colorId: number,
        size: number
    ) => {
        return await axios
            .put(`${SERVER_ENDPOINT}/users/remove-from-cart/${userId}`, {
                productId,
                colorId,
                size,
            })
            .then((res) => {
                if (user) {
                    saveUser({ ...user, cart: res.data.cart })
                }
            })
            .catch((err) => {
                console.error('Remove from cart failed:', err)
                return Promise.reject(err)
            })
    }

    const checkout = async (userId: number) => {
        return await axios
            .post(`${SERVER_ENDPOINT}/users/checkout/${userId}`)
            .then((res) => {
                saveUser(res.data.user)
            })
            .catch((err) => {
                console.error('Checkout failed:', err)
                return Promise.reject(err)
            })
    }

    const changePassword = async (
        userId: number,
        oldPassword: string,
        newPassword: string
    ) => {
        return await axios
            .put(`${SERVER_ENDPOINT}/users/change-password/${userId}`, {
                oldPassword,
                newPassword,
            })
            .then((res) => {
                saveUser(res.data.user)
            })
            .catch((err) => {
                console.error('Change password failed:', err)
                return Promise.reject(err)
            })
    }

    return (
        <UserContext.Provider
            value={{
                user,
                loggedIn: !!user,
                login,
                logout,
                signup,
                updateUser,
                deleteUser,
                changePassword,
                checkout,
                addToCart,
                removeFromCart,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const WebsiteInfoProvider = ({ children }: PropsWithChildren) => {
    const websiteInfo: WebsiteInfoContextType = {
        websiteTitle: 'Drip Pair',
        brands: [{ name: 'Adidas' }, { name: 'Balenciaga' }, { name: 'Nike' }],
        routing: [
            // Root Layout
            {
                path: '/',
                title: 'Home',
                inNav: true,
            },
            {
                path: '/profile',
                title: 'My Profile',
                loggedIn: true,
            },
            {
                path: '/cart',
                title: 'Cart',
                loggedIn: true,
            },
            // Shoes Layout
            {
                path: '/shoes',
                title: 'Shop All',
                inNav: true,
            },
            {
                path: '/shoes/brand/(adidas|balenciaga|nike)/\\d+$',
                title: ':shoe',
                inNav: false,
            },
            // Brands Layout
            {
                path: '/shoes/adidas',
                title: 'Adidas',
                inNav: true,
                brand: true,
            },
            {
                path: '/shoes/balenciaga',
                title: 'Balenciaga',
                inNav: true,
                brand: true,
            },
            {
                path: '/shoes/nike',
                title: 'Nike',
                inNav: true,
                brand: true,
            },
            // Auth Layout
            {
                path: '/auth/login',
                title: 'Login',
                loggedIn: false,
            },
            {
                path: '/auth/signup',
                title: 'Signup',
                loggedIn: false,
            },
            {
                path: '/auth/change-password',
                title: 'Change Password',
                loggedIn: true,
                hidden: true,
            },
        ],
    }

    return (
        <WebsiteInfoContext.Provider value={websiteInfo}>
            {children}
        </WebsiteInfoContext.Provider>
    )
}

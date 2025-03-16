import {
    PropsWithChildren,
    Dispatch,
    SetStateAction,
    CSSProperties,
    ChangeEvent,
} from 'react'

// Props
export type ShoeCardProps = {
    shoe: ShoeType
    brand: BrandType
}

export type ButtonProps = PropsWithChildren & {
    to?: string
    type?: HTMLButtonElement['type'] | 'link'
    onClick?: () => void
    disabled?: boolean
    id?: string
    className?: string
    style?: CSSProperties
    title?: string
}

export type AuthInputProps = {
    placeholder?: string
    autoFocus?: boolean
    isValid: boolean
    notValidMessage?: string
    type: HTMLInputElement['type']
    value?: HTMLInputElement['value']
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

// Objects
export type RoutingType = {
    path: string
    title: string
    inNav?: boolean
    loggedIn?: boolean
    hidden?: boolean
    brand?: boolean
}

export type BrandType = {
    id: number
    name: string
    founded: Date
    links: {
        website: string
    }
    founder: string
}

export type CartItemType = {
    productId: number
    colorId: number
    size: number
    quantity: number
}

export type ShoeColorVariant = {
    id: number
    name: string
    colors: { [key: string]: string }
}

export type ShoeType = {
    id: number
    name: string
    brand_id: number
    price: number
    sizes: number[]
    colors: ShoeColorVariant[]
}

export type UserType = {
    id?: number
    name: { first: string; last: string }
    email: string
    username: string
    password: string
    address: string
    dob: string
    phone: string
    cart?: CartItemType[]
    logged_in?: string
    ip?: { ipv4: string }
}

export type InputValidationType = {
    value: string
    isValid: boolean
    notValidMessage: string
}

// Contexts
export type IsMenuOpenedContextType = {
    isMenuOpened: [boolean, Dispatch<SetStateAction<boolean>>]
}
export type UserContextType = {
    user: UserType | null
    loggedIn: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
    signup: (userData: UserType) => Promise<void>
    updateUser: (id: number, userData: UserType) => Promise<void>
    deleteUser: (id: number) => Promise<void>
    addToCart: (
        userId: number,
        productId: number,
        colorId: number,
        size: number,
        quantity: number
    ) => Promise<void>
    removeFromCart: (
        userId: number,
        productId: number,
        colorId: number,
        size: number
    ) => Promise<void>
    checkout: (userId: number) => Promise<void>
    changePassword: (
        userId: number,
        oldPassword: string,
        newPassword: string
    ) => Promise<void>
}

export type WebsiteInfoContextType = {
    websiteTitle: string
    brands: { name: string }[]
    routing: RoutingType[]
}

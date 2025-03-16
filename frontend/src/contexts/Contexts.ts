import { createContext } from 'react'
// Types
import {
    IsMenuOpenedContextType,
    UserContextType,
    WebsiteInfoContextType,
} from '../types/Types.ts'

export const IsMenuOpenedContext = createContext<IsMenuOpenedContextType>(
    {} as IsMenuOpenedContextType
)

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const WebsiteInfoContext = createContext<WebsiteInfoContextType>(
    {} as WebsiteInfoContextType
)

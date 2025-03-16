import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
// Globals
import { SERVER_ENDPOINT } from '../globals/Globals.ts'
// Types
import { BrandType, ShoeType } from '../types/Types.ts'

// Brands Hooks
export const useBrands = () => {
    const {
        data: brands,
        isFetched,
        isLoading,
    } = useQuery({
        queryKey: ['brands'],
        queryFn: async (): Promise<BrandType[]> => {
            const { data } = await axios.get(`${SERVER_ENDPOINT}/brands`)
            return data
        },
    })
    return { brands, isFetched, isLoading }
}

// Shoes Hooks
export const useShoes = () => {
    const {
        data: shoes,
        isFetched,
        isLoading,
    } = useQuery({
        queryKey: ['shoes'],
        queryFn: async (): Promise<ShoeType[]> => {
            const { data } = await axios.get(`${SERVER_ENDPOINT}/shoes`)
            return data
        },
    })

    return { shoes, isFetched, isLoading }
}

export const useShoe = (id: number) => {
    const {
        data: shoe,
        isFetched,
        isLoading,
    } = useQuery({
        queryKey: ['shoe', id],
        queryFn: async (): Promise<ShoeType> => {
            const { data } = await axios.get(`${SERVER_ENDPOINT}/shoes/${id}`)
            return data
        },
        enabled: !!id,
    })

    return { shoe, isFetched, isLoading }
}

export const useShoesByBrand = (brandName: string) => {
    const {
        data: shoes,
        isFetched,
        isLoading,
    } = useQuery({
        queryKey: ['shoesByBrand', brandName],
        queryFn: async (): Promise<ShoeType[]> => {
            const { data } = await axios.get(
                `${SERVER_ENDPOINT}/shoes/brands/${brandName}`
            )
            return data
        },
        enabled: !!brandName,
    })

    return { shoes, isFetched, isLoading }
}

export const useShoesByIds = (shoeIds: number[]) => {
    const {
        data: shoes,
        isFetched,
        isLoading,
    } = useQuery({
        queryKey: ['shoesByIds', shoeIds],
        queryFn: async (): Promise<ShoeType[]> => {
            const { data } = await axios.post(
                `${SERVER_ENDPOINT}/shoes/by-ids`,
                { shoeIds }
            )
            return data
        },
        enabled: Array.isArray(shoeIds) && shoeIds.length > 0,
    })

    return { shoes, isFetched, isLoading }
}

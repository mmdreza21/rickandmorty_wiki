import type { Character } from '~/types/character'
import type { Episode } from '~/types/episode'
import type { Location } from '~/types/location'

export const useCharacters = () => {
    const { $apiClient } = useNuxtApp()

    const getCharacters = async (page: number = 1, search?: string) => {
        const params: Record<string, any> = { page }

        if (search) {
            params.name = search
        }

        try {
            return await $apiClient('/character', { params })
        } catch (error) {
            console.error('Error fetching characters:', error)
            throw error
        }
    }

    const getCharacterById = async (id: number) => {
        try {
            return await $apiClient<Character>(`/character/${id}`)
        } catch (error) {
            console.error(`Error fetching character ${id}:`, error)
            throw error
        }
    }

    const getMultipleEpisodes = async (episodeUrls: string[]) => {
        try {
            const episodeIds = episodeUrls.map(url => url.split('/').pop()).join(',')
            return await $apiClient<Episode[]>(`/episode/${episodeIds}`)
        } catch (error) {
            console.error('Error fetching episodes:', error)
            throw error
        }
    }

    const getMultipleLocations = async (locationUrl: string | undefined) => {
        try {
            const locationIds = locationUrl?.split('/').pop()
            return await $apiClient<Location>(`/location/${locationIds}`)
        } catch (error) {
            console.error('Error fetching locations:', error)
            throw error
        }
    }

    return {
        getCharacters,
        getCharacterById,
        getMultipleEpisodes,
        getMultipleLocations
    }
}
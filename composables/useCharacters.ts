import type { ApiResponse, Character } from '~/types/character';

export const useCharacters = () => {
    const { $apiClient } = useNuxtApp();

    const getCharacters = async (page: number = 1, search?: string) => {
        const params: Record<string, any> = { page };

        if (search) {
            params.name = search;
        }

        try {
            return await $apiClient<ApiResponse<Character>>('/character', {
                params,
            });
        } catch (error) {
            console.error('Error fetching characters:', error);
            throw error;
        }
    };

    const getCharacterById = async (id: number) => {
        try {
            return await $apiClient<Character>(`/character/${id}`);
        } catch (error) {
            console.error(`Error fetching character ${id}:`, error);
            throw error;
        }
    };

    const getMultipleCharacters = async (ids: number[]) => {
        try {
            return await $apiClient<Character[]>(`/character/${ids.join(',')}`);
        } catch (error) {
            console.error('Error fetching multiple characters:', error);
            throw error;
        }
    };

    return {
        getCharacters,
        getCharacterById,
        getMultipleCharacters,
    };
};
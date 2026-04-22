import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createAsset, deleteAsset, getAsset, getAssets, updateAsset } from '../api/assets.api'
import type { AssetFilters, AssetType, CreateAssetType } from '../types/types'

export function useAsset(id: string, options = {}) {
    return useQuery({
        queryKey: ['asset', id],
        queryFn: () => getAsset(id),
        enabled: !!id,
        ...options
    })
}

export function useAssets(filters: AssetFilters, options = {}) {
    return useQuery({
        queryKey: ['assets', filters],
        queryFn: () => getAssets(filters),
        ...options
    })
}

export function useCreateAsset() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateAssetType) => createAsset(data),

        onSuccess: () => {
            toast.success('Asset created')

            queryClient.invalidateQueries({ queryKey: ['assets'] })
        },

        onError: () => {
            toast.error('Failed to create asset')
        },
    })
}

type UpdateAssetType = {
    id: string;
    data: Partial<CreateAssetType>;
}
export function useUpdateAsset() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: UpdateAssetType) => updateAsset(id, data),

        onSuccess: () => {
            toast.success('Asset updated')

            queryClient.invalidateQueries({ queryKey: ['assets'] })
        },

        onError: () => {
            toast.error('Failed to update asset')
        },
    })
}

export function useDeleteAsset(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => deleteAsset(id),

        onSuccess: () => {
            toast.success('Asset deleted')

            queryClient.invalidateQueries({ queryKey: ['assets'] })
        },

        onError: () => {
            toast.error('Failed to delete asset')
        },
    })
}
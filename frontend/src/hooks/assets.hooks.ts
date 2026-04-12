import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createAsset, deleteAsset, getAsset, getAssets, updateAsset } from '../api/assets.api'
import type { AssetType } from '../types/types'

export function useAsset(id: string, options = {}) {
    return useQuery({
        queryKey: ['asset', id],
        queryFn: () => getAsset(id),
        enabled: !!id,
        ...options
    })
}

export function useAssets(options = {}) {
    return useQuery({
        queryKey: ['assets'],
        queryFn: getAssets,
        ...options
    })
}

export function useCreateAsset() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createAsset,

        onSuccess: () => {
            toast.success('Asset created')

            queryClient.invalidateQueries({ queryKey: ['assets'] })
        },

        onError: () => {
            toast.error('Failed to create asset')
        },
    })
}

export function useUpdateSupplier(id: string, data: AssetType) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => updateAsset(id, data),

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
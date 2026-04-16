import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createSupplier, deleteSupplier, getSupplier, getSuppliers, updateSupplier } from '../api/suppliers.api'
import toast from 'react-hot-toast'
import type { CreateSupplierType, SupplierType } from '../types/types'

export function useSupplier(id: string, options = {}) {
    return useQuery({
        queryKey: ['supplier', id],
        queryFn: () => getSupplier(id),
        enabled: !!id,
        ...options
    })
}

export function useSuppliers(options = {}) {
    return useQuery({
        queryKey: ['suppliers'],
        queryFn: getSuppliers,
        ...options
    })
}

export function useCreateSupplier() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateSupplierType) => createSupplier(data),

        onSuccess: () => {
            toast.success('Supplier created')

            // refresh supplier list
            queryClient.invalidateQueries({ queryKey: ['suppliers'] })
        },

        onError: () => {
            toast.error('Failed to create supplier')
        },
    })
}

export function useUpdateSupplier(id: string, data: SupplierType) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => updateSupplier(id, data),

        onSuccess: () => {
            toast.success('Supplier updated')

            // refresh supplier list
            queryClient.invalidateQueries({ queryKey: ['suppliers'] })
        },

        onError: () => {
            toast.error('Failed to update supplier')
        },
    })
}

export function useDeleteSupplier(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => deleteSupplier(id),

        onSuccess: () => {
            toast.success('Supplier deleted')

            // refresh supplier list
            queryClient.invalidateQueries({ queryKey: ['suppliers'] })
        },

        onError: () => {
            toast.error('Failed to delete supplier')
        },
    })
}
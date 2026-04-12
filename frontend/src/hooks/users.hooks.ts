import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../api/users.api'
import type { UserType } from '../types/types'

export function useUser(id: string, options = {}) {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id),
        enabled: !!id,
        ...options
    })
}

export function useUsers(options = {}) {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        ...options
    })
}

export function useCreateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createUser,

        onSuccess: () => {
            toast.success('User created')
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },

        onError: () => {
            toast.error('Failed to create user')
        },
    })
}

export function useUpdateUser(id: string, data: UserType) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => updateUser(id, data),
        onSuccess: () => {
            toast.success('User updated')
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: () => {
            toast.error('Failed to update user')
        },
    })
}

export function useDeleteUser(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => deleteUser(id),
        onSuccess: () => {
            toast.success('User deleted')
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: () => {
            toast.error('Failed to delete user')
        },
    })
}
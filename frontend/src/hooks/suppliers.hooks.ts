import { useQuery } from '@tanstack/react-query'
import { getSuppliers } from '../api/suppliers.api'

export function useSuppliers(options = {}) {
    return useQuery({
        queryKey: ['suppliers'],
        queryFn: getSuppliers,
        ...options
    })
}
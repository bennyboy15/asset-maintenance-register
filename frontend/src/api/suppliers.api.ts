import { axiosInstance } from '../utils'

export const getSuppliers = async () => {
    const res = await axiosInstance.get('/suppliers')
    return res.data
}

export const createSupplier = async (data: { name: string }) => {
    const res = await axiosInstance.post('/suppliers', data)
    return res.data
}
import type { CreateSupplierType, SupplierType } from '../types/types'
import { axiosInstance } from '../utils'

export async function getSupplier(id: string) {
    const res = await axiosInstance.get(`/suppliers/${id}`)
    return res.data
}

export async function getSuppliers() {
    const res = await axiosInstance.get('/suppliers')
    return res.data
}

export async function createSupplier(data: CreateSupplierType) {
    const res = await axiosInstance.post('/suppliers', data)
    return res.data
}

export async function updateSupplier(id: string, data: SupplierType) {
    const res = await axiosInstance.put(`/suppliers/${id}`, data);
    return res.data;
}

export async function deleteSupplier(id: string) {
    const res = await axiosInstance.delete(`/suppliers/${id}`);
    return res.data;
}
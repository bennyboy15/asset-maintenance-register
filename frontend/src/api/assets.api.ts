import type { AssetType } from '../types/types'
import { axiosInstance } from '../utils'

export async function getAsset(id: string) {
    const res = await axiosInstance.get(`/assets?id=${id}`)
    return res.data
}

export async function getAssets() {
    const res = await axiosInstance.get('/assets')
    return res.data
}

export async function createAsset(data: AssetType) {
    const res = await axiosInstance.post('/assets', data)
    return res.data
}

export async function updateAsset(id: string, data: Partial<AssetType>) {
    const res = await axiosInstance.put(`/assets?id=${id}`, data)
    return res.data
}

export async function deleteAsset(id: string) {
    const res = await axiosInstance.post('/assets', id)
    return res.data
}
import type { CreateHistoryType } from "../types/types";
import { axiosInstance } from "../utils";


export async function getHistory(id: string) {
    const res = await axiosInstance.get(`/history/${id}`)
    return res.data
}

export async function getHistorys() {
    const res = await axiosInstance.get('/history')
    return res.data
}

export async function createHistory(data: CreateHistoryType) {
    const res = await axiosInstance.post('/history', data)
    return res.data
}

export async function updateHistory(id: string, data: Partial<CreateHistoryType>) {
    const res = await axiosInstance.put(`/history/${id}`, data)
    return res.data
}

export async function deleteHistory(id: string) {
    const res = await axiosInstance.delete(`/history/${id}`)
    return res.data
}
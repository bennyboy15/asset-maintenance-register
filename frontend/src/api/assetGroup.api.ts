import type { AssetGroupType } from "../types/types";
import { axiosInstance } from "../utils";

export async function getAssetGroup(id: string) {
    const res = await axiosInstance.get(`/assetGroups/${id}`);
    return res.data
}

export async function getAssetGroups() {
    const res = await axiosInstance.get(`/assetGroups`);
    return res.data
}

export async function createAssetGroup(data: AssetGroupType) {
    const res = await axiosInstance.post(`/assetGroups`, data);
    return res.data;
}

export async function updateAssetGroup(id: string, data: AssetGroupType) {
    const res = await axiosInstance.post(`/assetGroups/${id}`, data);
    return res.data;
}

export async function deleteAssetGroup(id: string) {
    const res = await axiosInstance.delete(`/assetGroups/${id}`);
    return res.data;
}
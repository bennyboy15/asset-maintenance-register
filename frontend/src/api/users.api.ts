import type { UserType } from "../types/types";
import { axiosInstance } from "../utils";

export async function getUser(id: string) {
    const res = await axiosInstance.get(`/users/${id}`);
    return res.data;
}

export async function getUsers() {
    const res = await axiosInstance.get("/users");
    return res.data;
}

export async function createUser(data: UserType) {
    const res = await axiosInstance.post("/users", data);
    return res.data;
}

export async function updateUser(id: string, data: Partial<UserType>) {
    const res = await axiosInstance.post(`/users/${id}`, data);
    return res.data;
}

export async function deleteUser(id: string) {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
}
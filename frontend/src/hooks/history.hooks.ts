import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { createHistory, deleteHistory, getHistory, getHistorys, updateHistory } from "../api/history.api";
import type { HistoryType } from "../types/types";


export function useHistory(id: string, options = {}) {
    return useQuery({
        queryKey: ["history", id],
        queryFn: () => getHistory(id),
        enabled: !!id,
        ...options
    })
}

export function useHistorys(options = {}) {
    return useQuery({
        queryKey: ["history"],
        queryFn: getHistorys,
        ...options
    })
}

export function useCreateHistory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createHistory,
        onSuccess: () => {
            toast.success("Successfully created history");
            queryClient.invalidateQueries({ queryKey: ["history"] });
        },
        onError: () => toast.error("Error when creating history")
    })
}

export function useUpdateHistory(id: string, data: HistoryType) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updateHistory(id, data),
        onSuccess: () => {
            toast.success("Successfully updated history");
            queryClient.invalidateQueries({ queryKey: ["history"] });
        },
        onError: () => toast.error("Error when updating history")
    })
}

export function useDeleteHistory(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteHistory(id),
        onSuccess: () => {
            toast.success("Successfully deleted history grou");
            queryClient.invalidateQueries({ queryKey: ["history"] });
        },
        onError: () => toast.error("Error when deleting history")
    })
}
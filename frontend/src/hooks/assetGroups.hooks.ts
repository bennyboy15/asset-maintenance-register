import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAssetGroup, deleteAssetGroup, getAssetGroup, getAssetGroups, updateAssetGroup } from "../api/assetGroup.api";
import toast from "react-hot-toast";
import type { AssetGroupType } from "../types/types";

export function useAssetGroup(id: string, options = {}) {
    return useQuery({
        queryKey: ["assetGroup", id],
        queryFn: () => getAssetGroup(id),
        enabled: !!id,
        ...options
    })
}

export function useAssetGroups(options = {}) {
    return useQuery({
        queryKey: ["assetGroups"],
        queryFn: getAssetGroups,
        ...options
    })
}

export function useCreateAssetGroup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAssetGroup,
        onSuccess: () => {
            toast.success("Successfully created asset group");
            queryClient.invalidateQueries({ queryKey: ["assetGroups"] });
        },
        onError: () => toast.error("Error when creating asset group")
    })
}

export function useUpdateAssetGroup(id: string, data: AssetGroupType) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updateAssetGroup(id, data),
        onSuccess: () => {
            toast.success("Successfully updated asset group");
            queryClient.invalidateQueries({ queryKey: ["assetGroups"] });
        },
        onError: () => toast.error("Error when updating asset group")
    })
}

export function useDeleteAssetGroup(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteAssetGroup(id),
        onSuccess: () => {
            toast.success("Successfully deleted asset group");
            queryClient.invalidateQueries({ queryKey: ["assetGroups"] });
        },
        onError: () => toast.error("Error when deleting asset group")
    })
}
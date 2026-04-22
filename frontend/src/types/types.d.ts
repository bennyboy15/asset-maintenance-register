export type AssetType = {
    id: string;
    name: string;
    frequency: number;
    lastService: Date;
    nextService: Date;
    isRetired: boolean;
    retiredOn: Date;
    created_at: Date;
    updated_at: Date;

    // Foreign Keys
    responsibleUserId: string;
    supplierId: string;
    assetGroupId: string;

    // Relation Fields (Optional, as they are only present if 'included' in the query)
    responsibleUser?: UserType;
    supplier?: SupplierType;
    assetGroup?: AssetGroupType;
}

export type CreateAssetType = {
    name: string;
    frequency: number;
    lastService: Date;
    nextService: Date;

    // IDs
    responsibleUserId: string;
    supplierId: string;
    assetGroupId: string;
}

export interface AssetFilters {
    userId?: string;
    groupId?: string;
    isRetired?: boolean;
}

export type SupplierType = {
    id: string;
    name: string;
}

export type CreateSupplierType = {
    name: string
}

export type AssetGroupType = {
    id: string;
    name: string;
}

export type UserType = {
    id: string;
    name: string;
    email: string;
    created_at: date;
    updated_at: date;
}
import { useAssets } from "../hooks/assets.hooks"
import type { AssetType } from "../types/types";

function AssetsPage() {
    const { data: assets, isLoading, error } = useAssets({
        staleTime: 1000 * 60 * 10,
        retry: 5,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <>
            <div>AssetsPage</div>
            {assets.map((asset: AssetType) => (
                <div>{asset.name}</div>
            ))}
        </>
    )
}

export default AssetsPage
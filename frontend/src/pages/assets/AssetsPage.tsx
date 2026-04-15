import { Link } from "react-router-dom";
import { useAssets } from "../../hooks/assets.hooks"
import type { AssetType } from "../../types/types";
import { format, compareAsc } from "date-fns";
import { getStatus } from "../../utils";

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
            <Link to={"/assets/new"}>CREATE ASSET</Link>
            {assets?.map((asset: AssetType) => (
                <div key={asset.id} className="flex gap-8">
                    <div>{asset.name}</div>
                    <div>{format(asset.nextService, "dd/MM/yyyy")}</div>
                    <div className={getStatus(asset.nextService).color + " p-2 rounded text-white font-semibold"}>
                        {getStatus(asset.nextService).label}
                    </div>
                </div>
            ))}
        </>
    )
}

export default AssetsPage
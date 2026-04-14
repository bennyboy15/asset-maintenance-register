import { createAsset } from "../../api/assets.api";
import { useAssets } from "../../hooks/assets.hooks"
import type { AssetType } from "../../types/types";
import { useForm, type SubmitHandler } from "react-hook-form"

function AssetsPage() {
    const { data: assets, isLoading, error } = useAssets({
        staleTime: 1000 * 60 * 10,
        retry: 5,
        refetchOnWindowFocus: false,
    });

    const { register, handleSubmit, watch, formState: { errors }, } = useForm<AssetType>()
    const onSubmit: SubmitHandler<AssetType> = (data) => {
        console.log(data);
        createAsset(data);
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <>
            <div>AssetsPage</div>
            {assets?.map((asset: AssetType) => (
                <div key={asset.id}>{asset.name}</div>
            ))}

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-gray-300 bg-gray-50">
                <input {...register("name", { required: true })} className="border border-gray-300" />
                {errors.name && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </>
    )
}

export default AssetsPage
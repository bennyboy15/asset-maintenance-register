import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateAsset } from "../../hooks/assets.hooks"
import type { CreateAssetType } from "../../types/types";

function CreateAssetPage() {

    const { mutate: createAsset, isPending, isError } = useCreateAsset();

    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<CreateAssetType>();
    const onSubmit: SubmitHandler<CreateAssetType> = (data) => {
        console.log(data);
        createAsset(data, { onSuccess: () => reset() });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Asset Name */}
            <div>
                <label>Asset Name</label>
                <input {...register("name")} className="border p-2 w-full" />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Frequency */}
            <div>
                <label>Frequency (Days)</label>
                <input type="number" {...register("frequency")} className="border p-2 w-full" />
                {errors.frequency && <p className="text-red-500">{errors.frequency.message}</p>}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label>Last Service</label>
                    <input type="date" {...register("lastService")} className="border p-2 w-full" />
                </div>
                <div>
                    <label>Next Service</label>
                    <input type="date" {...register("nextService")} className="border p-2 w-full" />
                </div>
            </div>

            {/* Foreign Key Selects (Simplified) */}
            <div>
                <label>Responsible User ID</label>
                <input {...register("responsibleUserId")} placeholder="Paste User ID" className="border p-2 w-full" />
            </div>

            <div>
                <label>Supplier ID</label>
                <input {...register("supplierId")} placeholder="Paste Supplier ID" className="border p-2 w-full" />
            </div>

            <div>
                <label>Asset Group ID</label>
                <input {...register("assetGroupId")} placeholder="Paste Group ID" className="border p-2 w-full" />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
            >
                {isSubmitting ? "Creating..." : "Create Asset"}
            </button>
        </form>
    )
}

export default CreateAssetPage
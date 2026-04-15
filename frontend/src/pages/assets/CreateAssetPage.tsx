import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateAsset } from "../../hooks/assets.hooks"
import type { AssetGroupType, CreateAssetType, SupplierType, UserType } from "../../types/types";
import { useUsers } from "../../hooks/users.hooks";
import { useSuppliers } from "../../hooks/suppliers.hooks";
import { useAssetGroups } from "../../hooks/assetGroups.hooks";

function CreateAssetPage() {

    const { data: users, isLoading: usersLoading } = useUsers();
    const { data: suppliers, isLoading: suppliersLoading } = useSuppliers();
    const { data: assetGroups, isLoading: assetGroupsLoading } = useAssetGroups();

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

            <div>
                <label>Responsible User ID</label>
                <select {...register("responsibleUserId")} className="border p-2 w-full">
                    {users?.map((user: UserType) => (
                        <option value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Supplier ID</label>
                <select {...register("supplierId")} className="border p-2 w-full">
                    {suppliers?.map((supplier: SupplierType) => (
                        <option value={supplier.id}>{supplier.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Asset Group ID</label>
                <select {...register("assetGroupId")} className="border p-2 w-full">
                    {assetGroups?.map((assetGroup: AssetGroupType) => (
                        <option value={assetGroup.id}>{assetGroup.name}</option>
                    ))}
                </select>
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
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateAsset } from "../../hooks/assets.hooks";
import type { AssetGroupType, CreateAssetType, CreateSupplierType, SupplierType, UserType } from "../../types/types";
import { useUsers } from "../../hooks/users.hooks";
import { useCreateSupplier, useSuppliers } from "../../hooks/suppliers.hooks";
import { useAssetGroups } from "../../hooks/assetGroups.hooks";
import { useEffect, useState } from "react";
import { addDays, format, parseISO } from "date-fns";

const inputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5 outline-none transition-all";
const labelClass = "block text-sm font-semibold text-gray-700";

function CreateAssetPage() {
    const [isCreatingSupplier, setIsCreatingSupplier] = useState<boolean>(false);

    // Data Fetching
    const { data: users } = useUsers();
    const { data: suppliers } = useSuppliers();
    const { data: assetGroups } = useAssetGroups();

    // Mutations
    const { mutate: createAsset, isPending: createAssetPending } = useCreateAsset();
    const { mutate: createSupplier, isPending: createSupplierPending } = useCreateSupplier();

    // Form 1: Main Asset
    const { register, handleSubmit, watch, setValue, reset, formState: { errors, } } = useForm<CreateAssetType>();
    const lastService = watch("lastService");
    const frequency = watch("frequency");

    useEffect(() => {
        setValue("nextService", addDays(lastService, frequency));
    }, [frequency, lastService, setValue])

    // Form 2: Inline Supplier (used separately)
    const { register: supplierRegister, handleSubmit: handleSupplierSubmit, reset: supplierReset } = useForm<CreateSupplierType>();

    const onAssetSubmit: SubmitHandler<CreateAssetType> = (data) => {
        createAsset(data, { onSuccess: () => reset() });
    };

    const onSupplierSubmit: SubmitHandler<CreateSupplierType> = (data) => {
        createSupplier(data, {
            onSuccess: () => {
                supplierReset();
                setIsCreatingSupplier(false);
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Asset</h2>

            {/* MAIN FORM */}
            <form onSubmit={handleSubmit(onAssetSubmit)} className="space-y-6">

                {/* Asset Name */}
                <div>
                    <label className={labelClass}>Asset Name</label>
                    <input {...register("name", { required: "Name is required" })} className={inputClass} placeholder="e.g. Forklift, Laptop..." />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Frequency */}
                    <div>
                        <label className={labelClass}>Service Frequency (Days)</label>
                        <input type="number" {...register("frequency")} min={1} defaultValue={1} className={inputClass} />
                    </div>

                    {/* Asset Group */}
                    <div>
                        <label className={labelClass}>Asset Group</label>
                        <select {...register("assetGroupId")} className={inputClass}>
                            <option value="">Select Group</option>
                            {(Array.isArray(assetGroups) ? assetGroups : []).map((group: AssetGroupType) => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Last Service</label>
                        <input type="date" {...register("lastService")} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Next Service</label>
                        <input type="text" className="border border-gray-200 p-2 mt-1 w-full shadow rounded" value={format(watch("nextService"), "dd-MM-yyyy")} />
                    </div>
                </div>

                {/* Responsible User */}
                <div>
                    <label className={labelClass}>Responsible Person</label>
                    <select {...register("responsibleUserId")} className={inputClass}>
                        <option value="">Select User</option>
                        {(Array.isArray(users) ? users : []).map((user: UserType) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>

                {/* SUPPLIER SECTION (The tricky part) */}
                <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                    <div className="flex justify-between items-center mb-2">
                        <label className={labelClass}>Supplier</label>
                        <button
                            type="button"
                            onClick={() => setIsCreatingSupplier(!isCreatingSupplier)}
                            className="text-xs font-bold text-blue-600 hover:underline"
                        >
                            {isCreatingSupplier ? "← Back to List" : "+ Add New Supplier"}
                        </button>
                    </div>

                    {!isCreatingSupplier ? (
                        <select {...register("supplierId")} className={inputClass}>
                            <option value="">Select Supplier</option>
                            {(Array.isArray(suppliers) ? suppliers : []).map((s: SupplierType) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    ) : (
                        <div className="flex gap-2 animate-in fade-in slide-in-from-top-1">
                            <input
                                {...supplierRegister("name", { required: true })}
                                className={`${inputClass} bg-white`}
                                placeholder="New supplier name..."
                            />
                            <button
                                type="button" // Use type="button" then manually call the supplier submit
                                onClick={handleSupplierSubmit(onSupplierSubmit)}
                                disabled={createSupplierPending}
                                className="bg-green-600 text-white px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
                            >
                                {createSupplierPending ? "..." : "Save"}
                            </button>
                        </div>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={createAssetPending}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md active:scale-[0.98] disabled:bg-gray-400"
                    >
                        {createAssetPending ? "Processing..." : "Create Asset"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateAssetPage;
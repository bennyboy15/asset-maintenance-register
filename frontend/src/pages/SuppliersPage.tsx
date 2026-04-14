import { useForm, type SubmitHandler } from 'react-hook-form';
import { useCreateSupplier, useSuppliers } from '../hooks/suppliers.hooks'
import type { SupplierType } from '../types/types';

export default function SuppliersPage() {
    const { data: suppliers, isLoading, error } = useSuppliers({
        staleTime: 1000 * 60 * 10,
        retry: 5,
        refetchOnWindowFocus: false,
    });

    const { mutate: createSupplier, isPending } = useCreateSupplier();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<SupplierType>()
    const onSubmit: SubmitHandler<SupplierType> = (data) => {
        console.log(data);
        createSupplier(data, { onSuccess: () => reset() });
    }

    if (isLoading || isPending) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <>
            <div>
                {suppliers?.map((supplier: SupplierType) => (
                    <div key={supplier.id}>{supplier.name}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-gray-300 bg-gray-50">
                <input {...register("name", { required: true })} className="border border-gray-300" />
                {errors.name && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </>
    )
}
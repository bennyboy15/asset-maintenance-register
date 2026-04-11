import { useSuppliers } from '../hooks/suppliers.hooks'

export default function SuppliersPage() {
    const { data, isLoading, error } = useSuppliers({
        staleTime: 1000 * 60 * 10,
        retry: 5,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <div>
            {data.map((s: any) => (
                <div key={s.id}>{s.name}</div>
            ))}
        </div>
    )
}
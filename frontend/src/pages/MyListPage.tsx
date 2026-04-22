import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useAssets } from "../hooks/assets.hooks";
import SkeletonRefine from "../components/skeleton";
import { getStatus } from "../utils";
import type { AssetType } from "../types/types";


function MyListPage() {

    // Passing the filter to your hook (assuming your hook accepts query params)
    const { data: assets, isLoading, error } = useAssets({
        userId: "cmo9zduht0003ggm6khxnipf6"
    }, {
        staleTime: 1000 * 60 * 10,
    });

    if (error) return <div className="p-8 text-center text-red-500">Error loading assets.</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Assets Inventory</h1>
                    <p className="text-slate-500">Manage and track equipment maintenance</p>
                </div>

                <div className="flex gap-4 items-center">
                    <Link
                        to="/assets/new"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition"
                    >
                        + Create Asset
                    </Link>
                </div>
            </div>

            {isLoading ? (
                [1, 2, 3].map((item) => (
                    <div className="mb-4">
                        <SkeletonRefine key={item} />
                    </div>
                ))
            ) :

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-semibold text-slate-700">Asset Name</th>
                                <th className="p-4 font-semibold text-slate-700">Group</th>
                                <th className="p-4 font-semibold text-slate-700">Next Service</th>
                                <th className="p-4 font-semibold text-slate-700">Status</th>
                                <th className="p-4 font-semibold text-slate-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {assets?.map((asset: AssetType) => {
                                const status = getStatus(asset.nextService);
                                return (
                                    <tr key={asset.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-4">
                                            <div className="font-medium text-slate-900">{asset.name}</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-wider">ID: {asset.id.slice(-6)}</div>
                                        </td>
                                        <td className="p-4 text-slate-600">
                                            <span className="bg-slate-100 px-2 py-1 rounded text-sm">
                                                {asset.assetGroup?.name || "General"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-600">
                                            {format(new Date(asset.nextService), "MMM dd, yyyy")}
                                        </td>
                                        <td className="p-4">
                                            <span className={`${status.color} px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm`}>
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link
                                                to={`/assets/${asset.id}`}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-semibold p-2"
                                            >
                                                View Details →
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {assets?.length === 0 && (
                        <div className="p-20 text-center text-slate-400">
                            No assets found. Try adjusting your filters or create a new one.
                        </div>
                    )}
                </div>
            }
        </div>
    );
}

export default MyListPage;
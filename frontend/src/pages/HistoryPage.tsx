import { useHistorys } from "../hooks/history.hooks";
import type { HistoryType } from "../types/types";

export default function HistoryPage() {

    const { data: history } = useHistorys();

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Asset History Logs</h1>
                        <p className="text-gray-600">Track and manage asset events, suppliers, and dates.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        + Add New Entry
                    </button>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Type</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Asset ID</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Supplier ID</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {history?.map((item: HistoryType) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium uppercase">
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{item.assetId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.supplierId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-blue-600 mr-3">Edit</button>
                                        <button className="text-gray-400 hover:text-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
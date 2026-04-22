import { Link } from "react-router-dom";
import { Wrench, AlertTriangle, Package, History as HistoryIcon, ArrowRight } from "lucide-react";
import type { AssetType } from "../types/types";
import { useAssets } from "../hooks/assets.hooks";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import SkeletonRefine from "../components/skeleton";

export default function HomePage() {
    const { data: assets, isLoading } = useAssets();

    const totalAssets = assets?.length || 0;
    const overdueAssets = assets?.filter((a: AssetType) => new Date(a.nextService) < new Date() && !a.isRetired).length || 0;
    const retiredAssets = assets?.filter((a: AssetType) => a.isRetired).length || 0;

    return (

        <div className="max-w-7xl mx-auto space-y-8">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Maintenance Dashboard</h1>
                    <p className="text-muted-foreground text-lg">System status for April 2026.</p>
                </div>
            </div>

            {isLoading ?
                ([1, 2, 3].map((item) => (
                    <div className="mb-4">
                        <SkeletonRefine key={item} />
                    </div>
                ))) :
                (
                    <>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalAssets}</div>
                                    <p className="text-xs text-muted-foreground">Active in the system</p>
                                </CardContent>
                            </Card>

                            <Card className="border-red-200 bg-red-50/30">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium text-red-800">Overdue Service</CardTitle>
                                    <AlertTriangle className="h-4 w-4 text-red-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-700">{overdueAssets}</div>
                                    <p className="text-xs text-red-600/80 italic">Immediate attention required</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">Retired Assets</CardTitle>
                                    <Wrench className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{retiredAssets}</div>
                                    <p className="text-xs text-slate-500 font-medium tracking-tight uppercase">History only</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Upcoming Services</CardTitle>
                                    <CardDescription>Scheduled maintenance for the next 30 days.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {assets?.slice(0, 5).map((asset: AssetType) => (
                                            <div key={asset.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                                <div>
                                                    <p className="font-medium">{asset.name}</p>
                                                    <p className="text-xs text-muted-foreground">{asset.assetGroup?.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm">{new Date(asset.nextService).toLocaleDateString()}</p>
                                                    <Button variant="link" size="sm" className="h-auto p-0" asChild>
                                                        <Link to={`/assets/${asset.id}`}>Manage <ArrowRight className="ml-1 h-3 w-3" /></Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-2">
                                    <Button variant="outline" className="justify-start" asChild>
                                        <Link to="/assets"><Package className="mr-2 h-4 w-4" /> Browse Inventory</Link>
                                    </Button>
                                    <Button variant="outline" className="justify-start" asChild>
                                        <Link to="/suppliers"><HistoryIcon className="mr-2 h-4 w-4" /> View Suppliers</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )
            }
        </div >
    );
}
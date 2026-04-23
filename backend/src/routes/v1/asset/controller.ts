import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma-client";
import { addDays, startOfTomorrow, endOfDay, startOfDay } from 'date-fns';

export async function getAsset(req: Request, res: Response, next: NextFunction) {
    try {
        const asset = await prisma.asset.findUnique({
            where: { id: req.params.id as string }
        });
        return res.status(200).json(asset);
    } catch (error) {
        next(error)
    }
}

export async function getUpcomingAssets(req: Request, res: Response, next: NextFunction) {
    try {
        const today = startOfDay(new Date());             // Today 
        const endDay = endOfDay(addDays(new Date(), 14)); // 2 weeks in advance

        const assets = await prisma.asset.findMany({
            where: {
                isRetired: false,
                nextService: {
                    gte: today,
                    lte: endDay
                },
            },
            orderBy: {
                nextService: 'asc'
            },
            include: {
                assetGroup: { select: { name: true } },
                responsibleUser: { select: { name: true } },
                supplier: { select: { name: true } }
            }
        });
        return res.status(200).json(assets);
    } catch (error) {
        next(error)
    }
}

export async function getOverdueAssets(req: Request, res: Response, next: NextFunction) {
    try {
        const today = startOfDay(new Date());

        const assets = await prisma.asset.findMany({
            where: {
                isRetired: false,
                nextService: {
                    lt: today
                },
            },
            orderBy: {
                nextService: 'asc'
            },
            include: {
                assetGroup: { select: { name: true } },
                responsibleUser: { select: { name: true } },
                supplier: { select: { name: true } }
            }
        });
        return res.status(200).json(assets);
    } catch (error) {
        next(error)
    }
}

export async function getOverdueAssetsCount(req: Request, res: Response, next: NextFunction) {
    try {
        const today = startOfDay(new Date());

        const count = await prisma.asset.count({
            where: {
                isRetired: false,
                nextService: {
                    lt: today
                },
            },
        });
        return res.status(200).json(count);
    } catch (error) {
        next(error)
    }
}

export async function getUpcomingAssetsCount(req: Request, res: Response, next: NextFunction) {
    try {
        const today = startOfDay(new Date());
        const endDay = endOfDay(addDays(today, 14));
        const count = await prisma.asset.count({
            where: {
                isRetired: false,
                nextService: {
                    gte: today,
                    lte: endDay
                },
            },
        });
        return res.status(200).json(count);
    } catch (error) {
        next(error)
    }
}

export async function getAssets(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.query.userId as string;
        let assets = [];
        if (userId) {
            assets = await prisma.asset.findMany({
                where: {
                    responsibleUserId: userId,
                    isRetired: false
                },
                include: {
                    assetGroup: true,
                    supplier: true
                },
                orderBy: {
                    created_at: 'desc'
                }
            });
        } else {
            assets = await prisma.asset.findMany({
                where: { isRetired: false },
                include: {
                    assetGroup: true,
                    supplier: true
                },
                orderBy: {
                    created_at: 'desc'
                }
            });
        }
        return res.status(200).json(assets);
    } catch (error) {
        next(error)
    }
}

export async function createAsset(req: Request, res: Response, next: NextFunction) {
    try {
        const asset = await prisma.asset.create({
            data: {
                ...req.body,
                isRetired: req.body.isRetired ?? false,
                retiredOn: req.body.retiredOn ? new Date(req.body.retiredOn) : new Date(),
            }
        });
        return res.status(201).json({ asset });
    } catch (error) {
        next(error);
    }
}

export async function updateAsset(req: Request, res: Response, next: NextFunction) {
    try {
        const asset = await prisma.asset.update({
            where: { id: req.params.id as string },
            data: { ...req.body }
        });
        return res.status(200).json({ asset });
    } catch (error) {
        next(error);
    }
}

export async function deleteAsset(req: Request, res: Response, next: NextFunction) {
    try {
        const asset = await prisma.asset.delete({
            where: { id: req.params.id as string },
        });
        return res.status(200).json({ asset });
    } catch (error) {
        next(error);
    }
}




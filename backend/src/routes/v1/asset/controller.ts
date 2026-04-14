import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma-client";

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

export async function getAssets(req: Request, res: Response, next: NextFunction) {
    try {
        const assets = await prisma.asset.findMany({});
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




import { Request, Response, NextFunction } from "express"
import { prisma } from "../../../prisma-client"

export async function getAssetGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const assetGroup = await prisma.assetGroup.findUnique({
            where: { id: req.params.id as string }
        });
        return res.status(200).json(assetGroup);
    } catch (error) {
        next(error);
    }
}

export async function getAssetGroups(req: Request, res: Response, next: NextFunction) {
    try {
        const assetGroups = await prisma.assetGroup.findMany({});
        return res.status(200).json(assetGroups);
    } catch (error) {
        next(error);
    }
}

export async function createAssetGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const assetGroup = await prisma.assetGroup.create({
            data: { ...req.body }
        });
        return res.status(201).json(assetGroup);
    } catch (error) {
        next(error);
    }
}

export async function updateAssetGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const assetGroup = await prisma.assetGroup.update({
            where: { id: req.params.id as string },
            data: { ...req.body }
        });
        return res.status(200).json(assetGroup);
    } catch (error) {
        next(error);
    }
}

export async function deleteAssetGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const assetGroup = await prisma.assetGroup.delete({
            where: { id: req.params.id as string },
        });
        return res.status(200).json(assetGroup);
    } catch (error) {
        next(error);
    }
}




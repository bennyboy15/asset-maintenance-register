import {Request, Response, NextFunction } from "express"
import { prisma } from "../../../prisma-client"

export async function getAssetGroups(req:Request, res:Response, next:NextFunction) {
    try {
        const assetGroups = await prisma.assetGroup.findMany({});
        return res.status(200).json({assetGroups});
    } catch (error) {
        next(error);
    }
}




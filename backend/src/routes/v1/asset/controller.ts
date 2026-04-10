import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma-client";

export async function getAssets(req:Request, res:Response, next:NextFunction){
    try {
        const assets = await prisma.asset.findMany({});
        return res.status(200).json({assets});
    } catch (error) {
        next(error)
    }
}
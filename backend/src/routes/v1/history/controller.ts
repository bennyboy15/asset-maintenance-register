import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma-client";

export async function getHistory(req: Request, res: Response, next: NextFunction) {
    try {
        const history = await prisma.history.findMany({});
        return res.status(200).json(history);
    } catch (error) {
        next(error);
    }
}

export async function getHistoryById(req: Request, res: Response, next: NextFunction) {
    try {
        const historyItem = await prisma.history.findMany({
            where: { id: req.params.id as string }
        });
        return res.status(200).json(historyItem);
    } catch (error) {
        next(error);
    }
}

export async function createHistory(req: Request, res: Response, next: NextFunction) {
    try {
        const historyItem = await prisma.history.create({
            data: { ...req.body }
        });
        return res.status(201).json(historyItem);
    } catch (error) {
        next(error);
    }
}

export async function updateHistory(req: Request, res: Response, next: NextFunction) {
    try {
        const historyItem = await prisma.history.update({
            where: { id: req.params.id as string },
            data: { ...req.body }
        });
        return res.status(200).json(historyItem);
    } catch (error) {
        next(error);
    }
}

export async function deleteHistory(req: Request, res: Response, next: NextFunction) {
    try {
        const historyItem = await prisma.history.delete({
            where: { id: req.params.id as string }
        });
        return res.status(200).json(historyItem);
    } catch (error) {
        next(error);
    }
}
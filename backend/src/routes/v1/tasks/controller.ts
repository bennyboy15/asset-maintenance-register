import { NextFunction, Request, Response } from "express";
import EntityNotFoundError from "../../../errors/EntityNotFound";
import { prisma } from "../../../prisma-client";
import logger from "../../../logger";

export async function listTasks(req: Request, res: Response, next: NextFunction) {
    try {
        logger.info("Requesting Tasks");
        logger.child({ logMetadata: `User: ${req.auth?.payload.sub}` })
        const tasks = await prisma.task.findMany({
            where: {
                user_id: req.auth?.payload.sub
            }
        });
        return res.status(200).json({ tasks });
    } catch (error) {
        next(error)
    }
};

export async function getTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: req.params.id as string,
                user_id: req.auth?.payload.sub
            }
        });
        if (!task) return new EntityNotFoundError({ message: "Task not found", statusCode: 404, code: "ERR_NF" });
        return res.status(200).json({ task });
    } catch (error) {
        throw new EntityNotFoundError({ message: "Entity not found", statusCode: 404, code: "ERR_NF" });
    }
};

export async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await prisma.task.create({
            data: {
                user_id: req.auth?.payload.sub as string,
                ...req.body
            }
        });
        return res.status(201).json({ task });
    } catch (error) {
        throw new Error("Error when creating task")
    }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await prisma.task.update({
            where: {id: req.params.id as string},
            data: {
                ...req.body // alrady validated at middleware called before this function on route
            }
        });
        return res.status(200).json({ task });
    } catch (error) {
        throw new Error("Error when updating task")
    }
}
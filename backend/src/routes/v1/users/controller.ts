import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../prisma-client";
import logger from "../../../logger";

export async function listUsers(req: Request, res: Response, next: NextFunction) {
    try {
        logger.info("Requesting Users");
        const users = await prisma.user.findMany({
            omit: { password: true }
        });
        return res.status(200).json({ users });
    } catch (error) {
        next(error)
    }
};

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        logger.info("Requesting User @id: " + req.params.id);
        const user = await prisma.user.findUnique({
            where: { id: req.params.id as string },
            omit: { password: true }
        });
        return res.status(200).json({ user });
    } catch (error) {
        next(error)
    }
};

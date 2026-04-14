import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma-client";

export async function getSuppliers(req: Request, res: Response, next: NextFunction) {
    try {
        const suppliers = await prisma.supplier.findMany({});
        return res.status(200).json(suppliers);
    } catch (error) {
        next(error);
    }
};

export async function getSupplier(req: Request, res: Response, next: NextFunction) {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: { id: req.params.id as string }
        });
        return res.status(200).json(supplier);
    } catch (error) {
        next(error);
    }
};

export async function createSupplier(req: Request, res: Response, next: NextFunction) {
    try {
        const supplier = await prisma.supplier.create({
            data: {
                ...req.body
            }
        });
        return res.status(201).json(supplier);
    } catch (error) {
        next(error);
    }
};

export async function updateSupplier(req: Request, res: Response, next: NextFunction) {
    try {
        const supplier = await prisma.supplier.update({
            where: {
                id: req.params.id as string
            },
            data: {
                ...req.body
            }
        });
        return res.status(200).json(supplier);
    } catch (error) {
        next(error);
    }
};

export async function deleteSupplier(req: Request, res: Response, next: NextFunction) {
    try {
        const supplier = await prisma.supplier.delete({
            where: {
                id: req.params.id as string
            }
        });
        return res.status(200).json({ supplier });
    } catch (error) {
        next(error);
    }
};


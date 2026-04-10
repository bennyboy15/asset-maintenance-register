import { Router } from "express";
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from "./controller";
import validateRequest from "../../../middleware/validate-request";
import { createSupplierSchema, updateSupplierSchema } from "../../../data/request-schema";

const suppliers = Router();

suppliers.get("/", getSuppliers);
suppliers.post("/", validateRequest(createSupplierSchema), createSupplier);
suppliers.put("/:id", validateRequest(updateSupplierSchema), updateSupplier);
suppliers.delete("/:id", deleteSupplier);

export default suppliers;
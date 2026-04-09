import { Router } from "express";
import { getSuppliers } from "./controller";

const suppliers = Router();

suppliers.get("/", getSuppliers);

export default suppliers;
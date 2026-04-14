import { Router } from "express";
import { createAsset, deleteAsset, getAsset, getAssets, updateAsset } from "./controller";
import validateRequest from "../../../middleware/validate-request";
import { createAssetSchema, updateAssetSchema } from "../../../data/request-schema";

const asset = Router();

asset.get("/:id", getAsset);
asset.get("/", getAssets);
asset.post("/", validateRequest(createAssetSchema), createAsset);
asset.put("/:id", validateRequest(updateAssetSchema), updateAsset);
asset.delete("/:id", deleteAsset);


export default asset;
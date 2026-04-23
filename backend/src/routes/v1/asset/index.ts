import { Router } from "express";
import { createAsset, deleteAsset, getAsset, getAssets, getOverdueAssets, getOverdueAssetsCount, getUpcomingAssets, updateAsset } from "./controller";
import validateRequest from "../../../middleware/validate-request";
import { createAssetSchema, updateAssetSchema } from "../../../data/request-schema";

const asset = Router();

asset.get("/upcoming", getUpcomingAssets);
asset.get("/overdue", getOverdueAssets);
asset.get("/stats/overdue", getOverdueAssetsCount);
asset.get("/", getAssets);
asset.get("/:id", getAsset);

asset.post("/", validateRequest(createAssetSchema), createAsset);
asset.put("/:id", validateRequest(updateAssetSchema), updateAsset);
asset.delete("/:id", deleteAsset);

export default asset;
import { Router } from "express";
import { createAssetGroup, deleteAssetGroup, getAssetGroup, getAssetGroups, updateAssetGroup } from "./controller";
import validateRequest from "../../../middleware/validate-request";
import { createAssetGroupSchema, updateAssetGroupSchema } from "../../../data/request-schema";

const assetGroup = Router();

assetGroup.get("/:id", getAssetGroup);
assetGroup.get("/", getAssetGroups);
assetGroup.post("/", validateRequest(createAssetGroupSchema), createAssetGroup);
assetGroup.put("/:id", validateRequest(updateAssetGroupSchema), updateAssetGroup);
assetGroup.delete("/:id", deleteAssetGroup);

export default assetGroup;
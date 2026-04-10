import { Router } from "express";
import { getAssetGroups } from "./controller";

const assetGroup = Router();

assetGroup.get("/", getAssetGroups);

export default assetGroup;
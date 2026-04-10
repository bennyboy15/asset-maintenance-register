import {Router} from "express";
import { getAssets } from "./controller";

const asset = Router();

asset.get("/", getAssets);

export default asset;
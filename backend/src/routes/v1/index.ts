import express, { Router } from "express";
import users from "./users";
import suppliers from "./suppliers";
import assetGroup from "./assetGroup";
import asset from "./asset";
import history from "./history";

const v1: Router = express.Router();

v1.use("/users", users);
v1.use("/suppliers", suppliers);
v1.use("/assets", asset);
v1.use("/assetGroups", assetGroup);
v1.use("/history", history)

export default v1;
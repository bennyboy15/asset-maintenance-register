import express, { Router } from "express";
import users from "./users";
import suppliers from "./suppliers";
import assetGroup from "./assetGroup";
import asset from "./asset";

const v1: Router = express.Router();

v1.use("/users", users);
v1.use("/suppliers", suppliers);
v1.use("/assets", asset);
v1.use("/assetGroups", assetGroup);

export default v1;
import express, { Router } from "express";
import users from "./users";
import suppliers from "./suppliers";

const v1: Router = express.Router();

v1.use("/users", users);
v1.use("/suppliers", suppliers);

export default v1;
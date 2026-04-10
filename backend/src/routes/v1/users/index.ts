import express, { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "./controller";
import validateRequest from "../../../middleware/validate-request";
import { createUserSchema, updateUserSchema } from "../../../data/request-schema";

const users: Router = express.Router();

users.get("/", getUsers);
users.get("/:id", getUser);
users.post("/", validateRequest(createUserSchema), createUser);
users.put("/:id", validateRequest(updateUserSchema), updateUser);
users.delete("/", deleteUser);

export default users;
import express, { Router } from "express";
import { listUsers, getUser } from "./controller";

const users: Router = express.Router();

users.get("/", listUsers);
users.get("/:id", getUser);

export default users;
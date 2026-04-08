import express, { Router } from "express";
import tasks from "./tasks";
import projects from "./projects";
import users from "./users";

const v1: Router = express.Router();

v1.use("/tasks", tasks);
v1.use("/projects", projects);
v1.use("/users", users);

export default v1;
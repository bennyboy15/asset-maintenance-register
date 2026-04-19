import { Router } from "express";
import validateRequest from "../../../middleware/validate-request";
import { createHistory, deleteHistory, getHistory, getHistoryById, updateHistory } from "./controller";
import { createHistorySchema, updateHistorySchema } from "../../../data/request-schema";

const history = Router();

history.get("/", getHistory);
history.get("/:id", getHistoryById);
history.post("/", validateRequest(createHistorySchema), createHistory);
history.put("/:id", validateRequest(updateHistorySchema), updateHistory);
history.delete("/:id", deleteHistory);

export default history;
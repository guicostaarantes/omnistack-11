import express from "express";
import * as sessionController from "../controllers/SessionController";

const routes = express.Router();

routes.post("/ngo/session", sessionController.ngoCreate);

export default routes;

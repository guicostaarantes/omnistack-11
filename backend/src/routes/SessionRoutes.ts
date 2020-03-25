import express from "express";
import * as sessionController from "../controllers/SessionController";

const routes = express.Router();

routes.post("/session", sessionController.create);

export default routes;

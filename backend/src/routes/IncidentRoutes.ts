import express from "express";
import * as incidentController from "../controllers/IncidentController";

const routes = express.Router();

routes.get("/incident", incidentController.index);
routes.post("/incident", incidentController.create);
routes.delete("/incident/:id", incidentController.del);

export default routes;

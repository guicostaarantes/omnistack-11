import express from "express";
import * as incidentController from "../controllers/IncidentController";
import * as sessionController from "../controllers/SessionController";

const routes = express.Router();

routes.get("/incident", incidentController.index);
routes.post(
  "/incident",
  sessionController.ngoVerify,
  incidentController.create
);
routes.delete(
  "/incident/:id",
  sessionController.ngoVerify,
  incidentController.del
);

export default routes;

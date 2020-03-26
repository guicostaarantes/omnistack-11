import express from "express";
import * as ngoController from "../controllers/NgoContoller";
import * as incidentController from "../controllers/IncidentController";
import * as sessionController from "../controllers/SessionController";

const routes = express.Router();

routes.get("/ngo", ngoController.index);
routes.post("/ngo", ngoController.create);
routes.get("/ngo/me", sessionController.ngoVerify, ngoController.indexMe);
routes.get("/ngo/:id", ngoController.indexByNgo);
routes.get(
  "/ngo/:id/incidents",
  sessionController.ngoVerify,
  incidentController.indexByNgo
);

export default routes;

import express from "express";
import * as ngoController from "../controllers/NgoContoller";
import * as incidentController from "../controllers/IncidentController";

const routes = express.Router();

routes.get("/ngo", ngoController.index);
routes.post("/ngo", ngoController.create);
routes.get("/ngo/:id", ngoController.indexByNgo);
routes.get("/ngo/:id/incidents", incidentController.indexByNgo);

export default routes;

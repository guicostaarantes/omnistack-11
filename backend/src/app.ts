import dotenv from "dotenv";
dotenv.config();

import express from "express";
import ngoRoutes from "./routes/NgoRoutes";
import incidentRoutes from "./routes/IncidentRoutes";

const app = express();

app.use(express.json());

app.use(ngoRoutes);
app.use(incidentRoutes);

export default app;

import env from "../env";
import express from "express";
import NgoRoutes from "./routes/NgoRoutes";
import IncidentRoutes from "./routes/IncidentRoutes";

env();

const app = express();

app.use(express.json());

app.use(NgoRoutes);
app.use(IncidentRoutes);

export default app;

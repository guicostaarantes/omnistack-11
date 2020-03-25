import env from "../env";
import express from "express";
import cors from "cors";
import NgoRoutes from "./routes/NgoRoutes";
import IncidentRoutes from "./routes/IncidentRoutes";
import SessionRoutes from "./routes/SessionRoutes";

env();

const app = express();

app.use(cors());
app.use(express.json());

app.use(NgoRoutes);
app.use(IncidentRoutes);
app.use(SessionRoutes);

export default app;

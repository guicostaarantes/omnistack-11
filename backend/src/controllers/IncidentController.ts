import connection from "../database/connection";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  const { page = 1 } = req.query;
  const [count] = await connection("incidents").count();
  const incidents = await connection("incidents")
    .join("ngos", "ngos.id", "=", "incidents.ngo_id")
    .select([
      "incidents.*",
      "ngos.name",
      "ngos.email",
      "ngos.phone",
      "ngos.city",
      "ngos.uf"
    ])
    .limit(5)
    .offset(5 * (page - 1));
  res.header("X-Total-Count", count["count(*)"]);
  return res.json(incidents);
};

export const indexByNgo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const incidents = await connection("incidents")
    .select("*")
    .where("ngo_id", id);
  return res.json(incidents);
};

export const create = async (req: Request, res: Response) => {
  const { title, description, value } = req.body;
  const ngo_id = req.headers.authorization;
  const [id] = await connection("incidents").insert({
    ngo_id,
    title,
    description,
    value
  });

  return res.json({ id });
};

export const del = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ngo_id = req.headers.authorization;

  const incident = await connection("incidents")
    .select("ngo_id")
    .where("id", id)
    .first();

  if (ngo_id !== incident.ngo_id) {
    return res.status(401).json({ err: "Operation not allowed." });
  }

  await connection("incidents")
    .where("id", id)
    .delete();
  return res.status(204).send();
};

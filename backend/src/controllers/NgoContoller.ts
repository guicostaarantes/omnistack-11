import crypto from "crypto";
import connection from "../database/connection";
import { Request, Response } from "express";

export const index = async (_req: Request, res: Response) => {
  const ngos = await connection("ngos").select("id", "name");
  return res.status(200).json(ngos);
};

export const indexByNgo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ngos = await connection("ngos")
    .select("id", "name")
    .where("id", id);
  return res.status(200).json(ngos);
};

export const create = async (req: Request, res: Response) => {
  const { name, email, phone, city, uf } = req.body;
  const id = crypto.randomBytes(8).toString("HEX");

  await connection("ngos").insert({ id, name, email, phone, city, uf });
  return res.status(200).json({ id });
};

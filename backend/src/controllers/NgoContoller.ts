import bcrypt from "bcrypt";
import connection from "../database/connection";
import { Request, Response } from "express";

export const index = async (_req: Request, res: Response) => {
  const ngos = await connection("ngos").select("id", "name");
  return res.status(200).json(ngos);
};

export const indexMe = async (req: Request, res: Response) => {
  const ngos = await connection("ngos")
    .select("id", "name", "email", "phone", "city", "uf")
    .where("id", req.userId);
  return res.status(200).json(ngos);
};

export const indexByNgo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ngos = await connection("ngos")
    .select("id", "name", "email", "phone", "city", "uf")
    .where("id", id);
  return res.status(200).json(ngos);
};

export const create = async (req: Request, res: Response) => {
  const { name, email, password, phone, city, uf } = req.body;
  const password_hash = await bcrypt.hash(password, 8);
  await connection("ngos").insert({
    name,
    email,
    password_hash,
    phone,
    city,
    uf
  });
  return res.status(204).send();
};

import connection from "../database/connection";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  const { id } = req.body;
  const ngo = await connection("ngos")
    .where("id", id)
    .select("name")
    .first();
  if (!ngo) {
    return res.status(400).json({ err: "Bad request." });
  }
  return res.status(200).json(ngo);
};

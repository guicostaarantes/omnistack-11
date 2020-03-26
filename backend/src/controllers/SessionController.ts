import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../database/connection";
import { Request, Response } from "express";

export const ngoCreate = async (req: Request, res: Response) => {
  const { emailOrPhone, password } = req.body;
  const user = await connection("ngos")
    .where("email", emailOrPhone)
    .orWhere("phone", emailOrPhone)
    .select("id", "password_hash")
    .first();
  if (user) {
    const compare = await bcrypt.compare(password, user.password_hash);
    if (compare) {
      if (process.env.JWT_KEY === undefined) {
        res.status(400).json({ err: "Bad request." });
        throw new Error("Define process.env.JWT_KEY before creating users");
      }
      jwt.sign(
        { id: user.id },
        process.env.JWT_KEY,
        {
          expiresIn: "8h"
        },
        function(err, token) {
          if (err) {
            return res.status(401).json({ err: "Unauthorized." });
          }
          return res.status(200).json({ token });
        }
      );
    } else {
      return res.status(401).json({ err: "Unauthorized." });
    }
  } else {
    return res.status(401).json({ err: "Unauthorized." });
  }
};

export const ngoVerify = async (req: Request, res: Response, next: any) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    if (process.env.JWT_KEY === undefined) {
      res.status(400).json({ err: "Bad request." });
      throw new Error("Define process.env.JWT_KEY before creating tokens");
    }
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_KEY,
      {},
      function(err, data: any) {
        if (err) {
          return res.status(401).json({ err: "Unauthorized." });
        }
        req.userId = data.id;
        next();
      }
    );
  } else {
    return res.status(401).json({ err: "Unauthorized." });
  }
};

import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth-request";
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) : void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: "Token manquant" });
    return;
  } 

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Token invalide" });
      return;
    } 

    req.user = decoded as { email: string };
    next();
  });
};



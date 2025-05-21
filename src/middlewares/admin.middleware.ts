import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth-request";


export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.email === "admin@admin.com") {
    return next();
  }
  res.status(403).json({ message: "Admin seulement" });
};


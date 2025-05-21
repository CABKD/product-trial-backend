import { readUsers, writeUsers } from "../models/storage";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

import { Request, Response, NextFunction } from 'express';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, firstname, email, password } = req.body;
    const users = readUsers();

    if (users.some(u => u.email === email)) {
      res.status(400).json({ message: "Email existe déjà" });
      return;
    }

    const hashed = await hashPassword(password);
    const newUser = {
      id: Date.now(),
      username,
      firstname,
      email,
      password: hashed,
      cart: [],
      wishlist: [],
    };

    users.push(newUser);
    writeUsers(users);
    res.status(201).json({ message: "Utilisateur créé" });
  } catch (error) {
    next(error);
  }
};


export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user || !(await comparePassword(password, user.password))) {
      res.status(401).json({ message: "Mot de passse incorrect" });
      return;
    }

    const token = generateToken({ email: user.email });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};


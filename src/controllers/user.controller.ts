import { readUsers, writeUsers } from "../models/storage";
import { Response, NextFunction } from 'express';
import { AuthRequest } from "../types/auth-request";

export const getCart = (req: AuthRequest, res: Response) => {
  const user = readUsers().find(u => u.email === req.user!.email);
  res.json(user?.cart || []);
};

export const addToCart = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { productId } = req.body;

    if (typeof productId !== 'number') {
      res.status(400).json({ message: "Numéro de produit invalide" });
      return;
    }

    const users = readUsers();
    const user = users.find(u => u.email === req.user?.email);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      writeUsers(users);
    }

    res.json(user.cart);
  } catch (error) {
    next(error);
  }
};


export const getWishlist = (req: AuthRequest, res: Response) => {
  const user = readUsers().find(u => u.email === req.user!.email);
  res.json(user?.wishlist || []);
};

export const addToWishlist = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { productId } = req.body;

    if (typeof productId !== 'number') {
      res.status(400).json({ message: "id de produit invalide" });
      return;
    }

    const users = readUsers();
    const user = users.find(u => u.email === req.user?.email);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvable" });
      return;
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      writeUsers(users);
    }

    res.json(user.wishlist);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = (req: AuthRequest, res: Response) => {
  const productId = Number(req.params.productId);
  if (isNaN(productId)) {
    res.status(400).json({ message: "id de produit invalide" });
    return ;
  }

  const users = readUsers();
  const user = users.find(u => u.email === req.user?.email);
  if (!user) {
    res.status(404).json({ message: "Utilisateur non trouvable" });
    return ;
  }

  user.cart = user.cart.filter(id => id !== productId);
  writeUsers(users);
  res.json(user.cart);
};

export const removeFromWishlist = (req: AuthRequest, res: Response) => {
  const productId = Number(req.params.productId);
  if (isNaN(productId)) {
    res.status(400).json({ message: "id de produit invalide" });
    return;
  }

  const users = readUsers();
  const user = users.find(u => u.email === req.user?.email);
  if (!user) {
    res.status(404).json({ message: "Utilisateur non trouvable" });
    return;
  }

  user.wishlist = user.wishlist.filter(id => id !== productId);
  writeUsers(users);
  res.json(user.wishlist);
};


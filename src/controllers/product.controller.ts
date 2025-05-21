import { NextFunction, Request, Response } from "express";
import { readProducts, writeProducts } from "../models/storage";
import { Product } from "../models/product.model";

export const getAllProducts = (req: Request, res: Response) => {
  const products = readProducts();
  res.json(products);
};

export const getProductById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const id = Number(req.params.id);
    const product = readProducts().find(p => p.id === id);

    if (!product) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = (req: Request, res: Response) => {
  const {
    code,
    name,
    description,
    image,
    category,
    price,
    quantity,
    internalReference,
    shellId,
    inventoryStatus,
    rating,
  } = req.body;

  if (!code || !name || price == null || quantity == null) {
    res.status(400).json({ message: "Champs obligatoires manquants" });
    return ;
  }

  const products = readProducts();

  const newId = Date.now();

  const newProduct: Product = {
    id: newId,
    code,
    name,
    description: description || "",
    image: image || "",
    category: category || "",
    price,
    quantity,
    internalReference: internalReference || "",
    shellId: shellId || 0,
    inventoryStatus: inventoryStatus || "INSTOCK",
    rating: rating || 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
};

export const updateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const id = Number(req.params.id);
    const products = readProducts();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    products[index] = {
      ...products[index],
      ...req.body,
      updatedAt: Date.now(),
      id: products[index].id, 
      createdAt: products[index].createdAt,
    };

    writeProducts(products);
    res.json(products[index]);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const id = Number(req.params.id);
    let products = readProducts();

    const exists = products.some(p => p.id === id);
    if (!exists) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    products = products.filter(p => p.id !== id);
    writeProducts(products);

    res.json({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
};


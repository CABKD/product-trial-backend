import fs from "fs";
import path from "path";
import { Product } from "./product.model";
import { User } from "./user.model";

const productPath = path.join(__dirname, "../../data/products.json");
const userPath = path.join(__dirname, "../../data/users.json");

export const readProducts = (): Product[] => {
  if (!fs.existsSync(productPath)) return [];
  const data = fs.readFileSync(productPath, "utf-8");
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};;

export const writeProducts = (products: Product[]) => {
  fs.writeFileSync(productPath, JSON.stringify(products, null, 2));
};

export const readUsers = (): User[] => {
  const raw = fs.readFileSync(userPath, "utf-8");
  return JSON.parse(raw);
};

export const writeUsers = (users: User[]) => {
  fs.writeFileSync(userPath, JSON.stringify(users, null, 2));
};

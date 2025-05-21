import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller";

const router = express.Router();

router.get("/", authenticateToken, getAllProducts);
router.get("/:id", authenticateToken, getProductById);
router.post("/", authenticateToken, isAdmin, createProduct);
router.patch("/:id", authenticateToken, isAdmin, updateProduct);
router.delete("/:id", authenticateToken, isAdmin, deleteProduct);

export default router;

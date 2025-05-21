import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { addToCart, addToWishlist, getCart, getWishlist, removeFromCart, removeFromWishlist } from "../controllers/user.controller";

const router = express.Router();

router.get("/cart", authenticateToken, getCart);
router.post("/cart", authenticateToken, addToCart);
router.get("/wishlist", authenticateToken, getWishlist);
router.post("/wishlist", authenticateToken, addToWishlist);
router.delete("/cart/:productId", authenticateToken, removeFromCart);
router.delete("/wishlist/:productId", authenticateToken, removeFromWishlist);
export default router;

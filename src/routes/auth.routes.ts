import express from "express";
import { login, register } from "../controllers/auth.controller";

const router = express.Router();

router.post("/", register);
router.post("/token", login);

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/account", authRoutes);
app.use("/products", productRoutes);
app.use("/user", userRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

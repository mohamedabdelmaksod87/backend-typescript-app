import { Router } from "express";
import productRouter from "./productsRoutes";

const router = Router();

router.use("/product", productRouter);

export default router;

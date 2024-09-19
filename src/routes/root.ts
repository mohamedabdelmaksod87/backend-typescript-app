import { Router } from "express";
import productRouter from "./productroutes";

const router = Router();

router.use("/product", productRouter);

export default router;

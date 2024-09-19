import { Router } from "express";
import {
  CreateProductRequest,
  UpdateProductRequest,
  Product,
} from "../types/productTypes";

const productRouter = Router();

const productsInMemoryDb: Product[] = [];
let nextId = 1;

productRouter.post("/", (req: CreateProductRequest, res) => {
  const newProduct: Product = {
    id: nextId++,
    name: req.body.name,
    price: Number(req.body.price),
  };
  productsInMemoryDb.push(newProduct);
  res.status(201).json({ newProduct });
});

productRouter.get("/", (req, res) => {
  res.status(200).json(productsInMemoryDb);
});

productRouter.get("/:id", (req, res) => {
  const product = productsInMemoryDb.find(
    (p) => p.id === Number(req.params.id)
  );
  if (!product) return res.sendStatus(404);
  res.status(200).json(product);
});

productRouter.put("/:id", (req: UpdateProductRequest, res) => {
  const product = productsInMemoryDb.find(
    (p) => p.id === Number(req.params.id)
  );
  if (!product) return res.sendStatus(404);
  product.name = req.body.name;
  product.price = Number(req.body.price);
  res.status(200).json(product);
});

productRouter.delete("/:id", (req, res) => {
  const index = productsInMemoryDb.findIndex(
    (p) => p.id === Number(req.params.id)
  );
  if (index < 0) return res.sendStatus(404);
  productsInMemoryDb.splice(index, 1);
  res.sendStatus(204);
});

export default productRouter;

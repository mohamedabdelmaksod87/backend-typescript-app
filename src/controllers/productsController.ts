import {
  CreateProductRequest,
  UpdateProductRequest,
  Product,
} from "../types/productTypes";
import { Request, Response } from "express";
import logger from "../utilities/logger";

const productsInMemoryDb: Product[] = [];
let nextId = 1;

const createProduct = (req: CreateProductRequest, res: Response) => {
  const newProduct: Product = {
    id: nextId++,
    name: req.body.name,
    price: Number(req.body.price),
  };
  productsInMemoryDb.push(newProduct);
  logger.info(`New Product [${newProduct.name}] Created`);
  res.status(201).json({ newProduct });
};

const getAllProducts = (req: Request, res: Response) => {
  res.status(200).json(productsInMemoryDb);
};

const getProductById = (req: Request, res: Response) => {
  const product = productsInMemoryDb.find(
    (p) => p.id === Number(req.params.id)
  );
  if (!product) return res.sendStatus(404);
  res.status(200).json(product);
};

const updateProduct = (req: UpdateProductRequest, res: Response) => {
  const product = productsInMemoryDb.find(
    (p) => p.id === Number(req.params.id)
  );
  if (!product) return res.sendStatus(404);
  product.name = req.body.name;
  product.price = Number(req.body.price);
  logger.info(`Product [${product.name}] Updated`);
  res.status(200).json(product);
};

const deleteProduct = (req: Request, res: Response) => {
  const index = productsInMemoryDb.findIndex(
    (p) => p.id === Number(req.params.id)
  );
  if (index < 0) return res.sendStatus(404);
  const product = productsInMemoryDb.splice(index, 1)[0];
  logger.info(`Product [${product.name}] Deleted`);
  res.sendStatus(204);
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

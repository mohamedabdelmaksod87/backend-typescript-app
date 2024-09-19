import { Request } from "express";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductDto {
  name: string;
  price: string;
}

export type CreateProductRequest = Request<{}, {}, ProductDto>;

export type UpdateProductRequest = Request<{ id: string }, {}, ProductDto>;

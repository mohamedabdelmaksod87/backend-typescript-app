import { Request } from "express";

export interface Tea {
  id: number;
  name: string;
  price: number;
}

export interface TeaDto {
  name: string;
  price: string;
}

export type CreateTeaRequest = Request<{}, {}, TeaDto>;

export type UpdateTeaRequest = Request<{ id: string }, {}, TeaDto>;

import { Client } from "../client";
import { Product } from "../product";
import { Seller } from "../seller";

export type Sale = {
  id?: number;
  date?: string;
  toDelivery: boolean;
  delivered: boolean;
  clientId?: string | number;
  sellerId?: string;
  saleItem: SaleItem[];
  seller?: Seller;
  client?: Client;
};

export type SaleItem = {
  id?: number;
  price?: number;
  quantity: number;
  productId: string | number;
  product?: Product;
  saleId?: string;
};
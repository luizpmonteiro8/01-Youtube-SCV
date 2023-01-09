import { Category } from "../category";
import { Unity } from "../unity";

export type Product = {
  id?: number;
  name: string;
  priceSale: number | string;
  unityId: number;
  unity?: Unity;
  categoryId: number[];
  categories?: Category[];
};

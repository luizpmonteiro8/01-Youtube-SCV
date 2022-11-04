import { Unity } from "../unity";

export type Product = {
  id?: number | null;
  name: string;
  priceSale: number | string;
  unityId: number;
  unity?: Unity;
};

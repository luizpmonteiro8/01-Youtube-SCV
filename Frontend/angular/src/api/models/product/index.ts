import { Unity } from '../unity';

export type Product = {
  id?: number;
  name: string;
  priceSale: string;
  unityId: number;
  Unity?: Unity;
};

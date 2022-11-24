import { Unity } from '../unity';

export type Product = {
  id?: Number;
  name: string;
  priceSale: string;
  unityId: Number;
  unity?: Unity;
};

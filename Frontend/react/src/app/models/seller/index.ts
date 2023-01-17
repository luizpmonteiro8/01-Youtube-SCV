export type Seller = {
  id?: number;
  name: string;
  address?: {
    id?: number;
    street: string;
    number: string;
    complement: string;
    zipCode: string;
    district: string;
    state: string;
    country: string;
    clientId?: string;
    sellerId?: string;
  };
};

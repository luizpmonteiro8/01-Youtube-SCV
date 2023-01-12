export type Client = {
  id?: number;
  name: string;
  cpf: string;
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

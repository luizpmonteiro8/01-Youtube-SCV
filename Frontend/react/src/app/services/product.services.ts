import { Product, PaginationType } from "app";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";

type ResultType = {
  results: Product[];
  pagination: PaginationType;
};

const appUrl = "/product";

export const useProductService = () => {
  const loadPageProduct = async (
    page = 0,
    size = 25,
    search = "",
    order = "asc",
    sort = "name"
  ) => {
    const url = `${
      process.env.BASEURL + appUrl
    }/pages?page=${page}&size=${size}&=order=${order}
    &sort${sort}&search=${search}`;

    const response: AxiosResponse<ResultType> = await httpClient.get(url);
  };

  const create = async (product: Product) => {
    const url = process.env.BASEURL + appUrl;

    const response: AxiosResponse<Product> = await httpClient.post<Product>(
      url,
      product
    );

    return response.data;
  };
  const update = async (product: Product) => {
    const url = process.env.BASEURL + appUrl + "/" + product.id;

    const response: AxiosResponse<Product> = await httpClient.patch<Product>(
      url,
      product
    );

    return response.data;
  };
  const remove = async (id: number) => {
    const url = process.env.BASEURL + appUrl + "/" + id;

    const response: AxiosResponse<Product> = await httpClient.delete<Product>(
      url
    );

    return response.data;
  };

  return {
    loadPageProduct,
    create,
    update,
    remove,
  };
};

import { Sale, PaginationType } from "app";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";

type ResultType = {
  results: Sale[];
  pagination: PaginationType;
};

const appUrl = "/sale";

export const useSaleService = () => {
  const loadPageSale = async (
    page = 0,
    size = 25,
    search = "",
    order = "asc",
    sort = "id"
  ) => {
    const url = `${
      process.env.BASEURL + appUrl
    }/pages?page=${page}&size=${size}&order=${order}&sort=${sort}&search=${search}`;

    const response: AxiosResponse<ResultType> = await httpClient.get(url);

    return response.data;
  };

  const loadSaleById = async (id: number | string) => {
    const url = process.env.BASEURL + appUrl + "/" + id;
    const response: AxiosResponse<Sale> = await httpClient.get(url);

    return response.data;
  };

  const create = async (sale: Sale) => {
    const url = process.env.BASEURL + appUrl;

    const response: AxiosResponse<Sale> = await httpClient.post<Sale>(
      url,
      sale
    );

    return response.data;
  };
  const update = async (sale: Sale) => {
    const url = process.env.BASEURL + appUrl + "/" + sale.id;

    const response: AxiosResponse<Sale> = await httpClient.patch<Sale>(
      url,
      sale
    );

    return response.data;
  };
  const remove = async (id: number) => {
    const url = process.env.BASEURL + appUrl + "/" + id;

    const response: AxiosResponse<Sale> = await httpClient.delete<Sale>(url);

    return response.data;
  };

  return {
    loadPageSale,
    loadSaleById,
    create,
    update,
    remove,
  };
};

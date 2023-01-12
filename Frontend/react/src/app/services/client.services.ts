import { Client, PaginationType } from "app";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";

type ResultType = {
  results: Client[];
  pagination: PaginationType;
};

const appUrl = "/client";

export const useClientService = () => {
  const loadPageClient = async (
    page = 0,
    size = 25,
    search = "",
    order = "asc",
    sort = "name"
  ) => {
    const url = `${
      process.env.BASEURL + appUrl
    }/pages?page=${page}&size=${size}&order=${order}&sort=${sort}&search=${search}`;

    const response: AxiosResponse<ResultType> = await httpClient.get(url);

    return response.data;
  };

  const loadClientById = async (id: number | string) => {
    const url = process.env.BASEURL + appUrl + "/" + id;
    const response: AxiosResponse<Client> = await httpClient.get(url);

    return response.data;
  };

  const create = async (client: Client) => {
    const url = process.env.BASEURL + appUrl;

    const response: AxiosResponse<Client> = await httpClient.post<Client>(
      url,
      client
    );

    return response.data;
  };
  const update = async (client: Client) => {
    const url = process.env.BASEURL + appUrl + "/" + client.id;

    const response: AxiosResponse<Client> = await httpClient.patch<Client>(
      url,
      client
    );

    return response.data;
  };
  const remove = async (id: number) => {
    const url = process.env.BASEURL + appUrl + "/" + id;

    const response: AxiosResponse<Client> = await httpClient.delete<Client>(
      url
    );

    return response.data;
  };

  return {
    loadPageClient,
    loadClientById,
    create,
    update,
    remove,
  };
};

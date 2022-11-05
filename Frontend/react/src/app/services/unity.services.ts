import { Unity, PaginationType } from "app";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";

type ResultType = {
  results: Unity[];
  pagination: PaginationType;
};

const appUrl = "/unity";

export const useUnityService = () => {
  const loadPageUnity = async (
    page = 0,
    size = 25,
    search = "",
    order = "asc",
    sort = "name"
  ) => {
    console.log(order);

    const url = `${
      process.env.BASEURL + appUrl
    }/pages?page=${page}&size=${size}&order=${order}&sort=${sort}&search=${search}`;

    const response: AxiosResponse<ResultType> = await httpClient.get(url);

    return response.data;
  };

  const loadUnityById = async (id: number | string) => {
    const url = process.env.BASEURL + appUrl + "/" + id;
    const response: AxiosResponse<Unity> = await httpClient.get(url);

    return response;
  };

  const create = async (unity: Unity) => {
    const url = process.env.BASEURL + appUrl;

    const response: AxiosResponse<Unity> = await httpClient.post<Unity>(
      url,
      unity
    );

    return response.data;
  };
  const update = async (unity: Unity) => {
    const url = process.env.BASEURL + appUrl + "/" + unity.id;

    const response: AxiosResponse<Unity> = await httpClient.patch<Unity>(
      url,
      unity
    );

    return response.data;
  };
  const remove = async (id: number) => {
    const url = process.env.BASEURL + appUrl + "/" + id;

    const response: AxiosResponse<Unity> = await httpClient.delete<Unity>(url);

    return response.data;
  };

  return {
    loadPageUnity,
    loadUnityById,
    create,
    update,
    remove,
  };
};

import { User, PaginationType } from "app";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";

type ResultType = {
  results: User[];
  pagination: PaginationType;
};

const appUrl = "/user";

export const useUserService = () => {
  const loadPageUser = async (
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

  const loadUserById = async (id: number | string) => {
    const url = process.env.BASEURL + appUrl + "/" + id;
    const response: AxiosResponse<User> = await httpClient.get(url);

    return response.data;
  };

  const create = async (user: User) => {
    const url = process.env.BASEURL + appUrl;

    const response: AxiosResponse<User> = await httpClient.post<User>(
      url,
      user
    );

    return response.data;
  };
  const update = async (user: User) => {
    const url = process.env.BASEURL + appUrl + "/" + user.id;

    const response: AxiosResponse<User> = await httpClient.patch<User>(
      url,
      user
    );

    return response.data;
  };
  const remove = async (id: number) => {
    const url = process.env.BASEURL + appUrl + "/" + id;

    const response: AxiosResponse<User> = await httpClient.delete<User>(url);

    return response.data;
  };

  return {
    loadPageUser,
    loadUserById,
    create,
    update,
    remove,
  };
};

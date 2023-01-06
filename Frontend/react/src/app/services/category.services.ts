import { Category, PaginationType } from "app";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";

type ResultType = {
  results: Category[];
  pagination: PaginationType;
};

const appUrl = "/category";

export const useCategoryService = () => {
  const loadPageCategory = async (
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

  const loadCategoryById = async (id: number | string) => {
    const url = process.env.BASEURL + appUrl + "/" + id;
    const response: AxiosResponse<Category> = await httpClient.get(url);

    return response.data;
  };

  const create = async (category: Category) => {
    const url = process.env.BASEURL + appUrl;

    const response: AxiosResponse<Category> = await httpClient.post<Category>(
      url,
      category
    );

    return response.data;
  };
  const update = async (category: Category) => {
    const url = process.env.BASEURL + appUrl + "/" + category.id;

    const response: AxiosResponse<Category> = await httpClient.patch<Category>(
      url,
      category
    );

    return response.data;
  };
  const remove = async (id: number) => {
    const url = process.env.BASEURL + appUrl + "/" + id;

    const response: AxiosResponse<Category> = await httpClient.delete<Category>(
      url
    );

    return response.data;
  };

  return {
    loadPageCategory,
    loadCategoryById,
    create,
    update,
    remove,
  };
};

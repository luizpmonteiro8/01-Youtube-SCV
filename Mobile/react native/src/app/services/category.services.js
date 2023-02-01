import {httpClient} from '../http';
import {AxiosResponse} from 'axios';

const appUrl = '/category';
export const useCategoryService = () => {
  const loadPageCategory = async (
    page = 0,
    size = 25,
    search = '',
    order = 'asc',
    sort = 'name',
  ) => {
    const response: AxiosResponse<any> = await httpClient.get(
      appUrl +
        `/pages?page=${page}&size=${size}&order=${order}&sort=${sort}&search=${search}`,
    );
    return response.data;
  };

  const loadCategoryById = async (id: number | string) => {
    const response: AxiosResponse<any> = await httpClient.get(
      appUrl + '/' + id,
    );
    return response.data;
  };

  const create = async category => {
    const response: AxiosResponse<any> = await httpClient.post(
      appUrl,
      category,
    );
    return response.data;
  };
  const update = async category => {
    const response: AxiosResponse<any> = await httpClient.patch(
      appUrl + '/' + category.id,
      category,
    );
    return response.data;
  };
  const remove = async id => {
    const response: AxiosResponse<any> = await httpClient.delete(
      appUrl + '/' + id,
    );
    return response.data;
  };

  return {loadPageCategory, loadCategoryById, create, update, remove};
};

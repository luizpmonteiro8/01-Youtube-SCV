import {httpClient} from '../http';
import {AxiosResponse} from 'axios';

const appUrl = '/product';
export const useProductService = () => {
  const loadPageProduct = async (
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

  const loadProductById = async (id: number | string) => {
    const response: AxiosResponse<any> = await httpClient.get(
      appUrl + '/' + id,
    );
    return response.data;
  };

  const create = async product => {
    const response: AxiosResponse<any> = await httpClient.post(appUrl, product);
    return response.data;
  };
  const update = async product => {
    const response: AxiosResponse<any> = await httpClient.patch(
      appUrl + '/' + product.id,
      product,
    );
    return response.data;
  };
  const remove = async id => {
    const response: AxiosResponse<any> = await httpClient.delete(
      appUrl + '/' + id,
    );
    return response.data;
  };

  return {loadPageProduct, loadProductById, create, update, remove};
};

import {httpClient} from '../http';
import {AxiosResponse} from 'axios';

const appUrl = '/client';
export const useClientService = () => {
  const loadPageClient = async (
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

  const loadClientById = async (id: number | string) => {
    const response: AxiosResponse<any> = await httpClient.get(
      appUrl + '/' + id,
    );
    return response.data;
  };

  const create = async client => {
    const response: AxiosResponse<any> = await httpClient.post(appUrl, client);
    return response.data;
  };
  const update = async client => {
    const response: AxiosResponse<any> = await httpClient.patch(
      appUrl + '/' + client.id,
      client,
    );
    return response.data;
  };
  const remove = async id => {
    const response: AxiosResponse<any> = await httpClient.delete(
      appUrl + '/' + id,
    );
    return response.data;
  };

  return {loadPageClient, loadClientById, create, update, remove};
};

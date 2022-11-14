import {httpClient} from '../http';
import {AxiosResponse} from 'axios';

const appUrl = '/unity';
export const useUnityService = () => {
  const loadPageUnity = async (
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

  const loadUnityById = async (id: number | string) => {
    const response: AxiosResponse<any> = await httpClient.get(
      appUrl + '/' + id,
    );
    return response.data;
  };

  const create = async unity => {
    const response: AxiosResponse<any> = await httpClient.post(appUrl, unity);
    return response.data;
  };
  const update = async unity => {
    const response: AxiosResponse<any> = await httpClient.patch(
      appUrl + '/' + unity.id,
      unity,
    );
    return response.data;
  };
  const remove = async id => {
    const response: AxiosResponse<any> = await httpClient.delete(
      appUrl + '/' + id,
    );
    return response.data;
  };

  return {loadPageUnity, loadUnityById, create, update, remove};
};

import axios, {AxiosResponse} from 'axios';

const appUrl = '/user';
export const useUserService = () => {
  const create = async (name, email, password) => {
    const response: AxiosResponse<any> = await axios.post(
      'http://192.168.100.122:3002' + appUrl,
      {
        name,
        email,
        password,
      },
    );
    return response.data;
  };

  return {create};
};

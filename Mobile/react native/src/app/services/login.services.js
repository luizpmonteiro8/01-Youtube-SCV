import axios, {AxiosResponse} from 'axios';

const appUrl = '/login';
export const useLoginService = () => {
  const login = async (email, password) => {
    const response: AxiosResponse<any> = await axios.post(
      'http://192.168.100.122:3002' + appUrl,
      {
        email,
        password,
      },
    );
    return response.data;
  };

  return {login};
};

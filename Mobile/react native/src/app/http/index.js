import Axios, {AxiosInstance} from 'axios';

export const httpClient: AxiosInstance = Axios.create({
  baseURL: 'http://192.168.100.122:3002',
  withCredentials: false,
});

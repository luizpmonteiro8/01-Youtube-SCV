import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios, {AxiosInstance} from 'axios';

export const httpClient: AxiosInstance = Axios.create({
  baseURL: 'http://192.168.100.122:3002',
  withCredentials: false,
});

httpClient.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

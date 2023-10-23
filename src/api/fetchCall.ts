import axios, { AxiosError } from 'axios';

const API_BASE_URL = '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const API_TOKEN = sessionStorage.getItem('accessToken');
    if (API_TOKEN) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchCall = async (
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
) => {
  try {
    const response = await axiosInstance[method](url, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError);
    throw axiosError;
  }
};

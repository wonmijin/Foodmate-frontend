import axios, { AxiosError } from 'axios';

const API_BASE_URL = '/api';
const API_TOKEN = sessionStorage.getItem('accessToken');

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchCall = async (
  method: 'get' | 'post' | 'put' | 'delete',
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

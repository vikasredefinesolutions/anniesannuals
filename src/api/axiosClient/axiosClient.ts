import axios from 'axios';

const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: BaseUrl,
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error: any) {
    return Promise.reject(error?.response?.data);
  },
);

export default axiosClient;

import axios, { AxiosRequestConfig } from 'axios';

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const SendAsync = <T>(request: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    axiosInterceptorInstance
      .request(request)
      // eslint-disable-next-line
      .then(({ data, errors }: any) => {
        if (data?.success) {
          resolve(data?.data);
        } else {
          reject(data?.errors);
          throw new Error(errors);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    if (config.data && config.data.files) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  },
);
// End of Request interceptor

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  },
);
// End of Response interceptor

export default axiosInterceptorInstance;

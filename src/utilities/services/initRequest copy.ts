import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type IConfig = AxiosRequestConfig & {
  showSpin?: boolean;
};

type IAxiosResponse = AxiosError & {
  config: {
    showSpin?: boolean;
  };
};

const requestConfig: IConfig = {
  baseURL: "http://localhost:8087/api/v1",
  showSpin: false,
  headers: {
    "content-type": "application/json",
  },
};

export const axiosInstance1 = axios.create(requestConfig);

export default function initRequest() {
  axiosInstance1.interceptors.request.use(
    (config: IConfig) => {
      return config;
    },
    (error: IAxiosResponse) => {
      return Promise.reject(error);
    }
  );

  axiosInstance1.interceptors.response.use(
    (response: AxiosResponse): Promise<any> => {
      const { data } = response;

      return data;
    },
    (error: IAxiosResponse) => {
      // handle errors
      switch (error.response?.status) {
        case 401: {
          break;
        }
        case 403: {
          break;
        }
        case 500: {
          break;
        }
        default:
          break;
      }

      return Promise.reject(error.response?.data);
    }
  );
}

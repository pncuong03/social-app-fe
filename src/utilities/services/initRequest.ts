import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_ENDPOINT } from "src/const/env";

export type IConfig = AxiosRequestConfig & {
  showSpin?: boolean;
};

type IAxiosResponse = AxiosError & {
  config: {
    showSpin?: boolean;
  };
};

const requestConfig: IConfig = {
  baseURL: API_ENDPOINT,
  showSpin: false,
  headers: {
    "content-type": "application/json",
  },
};

export const axiosInstance = axios.create(requestConfig);

export default function initRequest() {
  axiosInstance.interceptors.request.use(
    (config: IConfig) => {
      return config;
    },
    (error: IAxiosResponse) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
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

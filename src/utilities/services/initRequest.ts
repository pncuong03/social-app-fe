import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_ENDPOINT } from "src/const/env";
import { interceptorLoadingElements } from "../commons/utils";
import LocalStorage, { LocalStorageKey } from "../local-storage/localStorage";

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
      interceptorLoadingElements(true);

      const accessToken = LocalStorage.get(LocalStorageKey.ACCESS_TOKEN);

      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      return config;
    },
    (error: IAxiosResponse) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse): Promise<any> => {
      const { data } = response;

      interceptorLoadingElements(false);

      return data;
    },
    (error: IAxiosResponse) => {
      // handle errors
      interceptorLoadingElements(false);

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

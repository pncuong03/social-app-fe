import LocalStorage, { LocalStorageKey } from "src/utilities/local-storage/localStorage";
import httpRequest from "src/utilities/services/httpRequest";

export function authLogin(params: { username: string; password: string }) {
  return httpRequest.post("/uaa-service/api/v1/user/log-in", params).then((data: any) => {
    LocalStorage.set(LocalStorageKey.ACCESS_TOKEN, data.accessToken);

    return data;
  });
}

export function authRegister(params: { fullName: string; username: string; password: string; birthday: string }) {
  return httpRequest.post("/uaa-service/api/v1/user/sign-up", params).then((data: any) => {
    LocalStorage.set(LocalStorageKey.ACCESS_TOKEN, data.accessToken);

    return data;
  });
}

export const logout = () => {
  LocalStorage.clear();
};

export function myInfo() {
  return httpRequest.get("/uaa-service/api/v1/user").then((data: any) => {
    return data;
  });
}

export function subcribeWorkerApi(params: any) {
  return httpRequest.post("/web-push-service/api/webpush/subscribe", params).then((data: any) => {
    return data;
  });
}

export function unSubcribeWorkerApi(params: any) {
  return httpRequest.delete("/web-push-service/api/webpush/unsubscribe", params);
}

import LocalStorage, { LocalStorageKey } from "../local-storage/localStorage";

export const isLoggedIn = () => {
  const access_token = LocalStorage.get(LocalStorageKey.ACCESS_TOKEN) || "";

  return access_token.length > 0;
};

export const interceptorLoadingElements = (calling: boolean): void => {
  const elements = document.querySelectorAll<HTMLElement>(".interceptor-loading");

  elements.forEach((element) => {
    if (calling) {
      element.style.opacity = "0.5";
      element.style.pointerEvents = "none";
    } else {
      element.style.opacity = "initial";
      element.style.pointerEvents = "initial";
    }
  });
};

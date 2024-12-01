import LocalStorage, { LocalStorageKey } from "../local-storage/localStorage";

export const isLoggedIn = () => {
  const access_token = LocalStorage.get(LocalStorageKey.ACCESS_TOKEN) || "";

  return access_token.length > 0;
};

export const interceptorLoadingElements = (calling: boolean): void => {
  const elements = document.querySelectorAll<HTMLElement>(".interceptor-loading");

  // elements.forEach((element) => {
  //   if (calling) {
  //     element.style.opacity = "0.5";
  //     element.style.pointerEvents = "none";
  //   } else {
  //     element.style.opacity = "initial";
  //     element.style.pointerEvents = "initial";
  //   }
  // });
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      // Nếu đang trong thời gian chờ gọi API (calling === true) thì sẽ làm mờ phần tử và chặn click bằng css pointer-events
      elements[i].style.opacity = "0.5";
      elements[i].style.pointerEvents = "none";
    } else {
      // Ngược lại thì trả về như ban đầu, không làm gì cả
      elements[i].style.opacity = "initial";
      elements[i].style.pointerEvents = "initial";
    }
  }
};

import LocalStorage, { LocalStorageKey } from "../local-storage/localStorage";

export const isLoggedIn = () => {
  const access_token = LocalStorage.get(LocalStorageKey.ACCESS_TOKEN) || "";

  return access_token.length > 0;
};

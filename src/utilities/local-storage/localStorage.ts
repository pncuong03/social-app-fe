export enum LocalStorageKey {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  IS_LOGIN = "IS_LOGIN",
  USER = "USER",
}

export default class LocalStorage {
  public static get = (key: LocalStorageKey) => {
    return localStorage.getItem(key);
  };

  public static set = (key: LocalStorageKey, value: string) => {
    return localStorage.setItem(key, value);
  };

  public static remove = (key: LocalStorageKey) => {
    return localStorage.removeItem(key);
  };

  public static clear = () => {
    return localStorage.clear();
  };
}

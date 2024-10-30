const env = (window as any).env || process.env;

export const API_ENDPOINT = env.REACT_APP_API_ENDPOINT;
export const API_SOCKET = env.REACT_APP_API_SOCKET;
export const IS_MAINTAIN = env.REACT_APP_IS_MAINTAIN;

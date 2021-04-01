import axios from "axios";

const BACKEND_URL = `https://6.react.pages.academy/wtw`;
const TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
  BLANK_FIELD: 400
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    const {response} = error;

    if (response.status === HttpCode.UNAUTHORIZED || response.status === HttpCode.BLANK_FIELD) {
      onUnauthorized();

      throw error;
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

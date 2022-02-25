import { getToken } from "auth-provider";
import axios from "axios";

// 封装 get 请求
export const get = (url: string, params?: any) => {
  // console.log('params', params)
  const token = getToken();
  const AUTH_TOKEN = `Token ${token}`;
  return axios
    .get(url, {
      params,
      headers: {
        Authorization: AUTH_TOKEN,
      },
    })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

// 封装 post 请求
export const post = (url: string, data?: any) => {
  const token = getToken();
  const AUTH_TOKEN = `Token ${token}`;
  return axios
    .post(url, {
      data,
      headers: {
        Authorization: AUTH_TOKEN,
      },
    })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

// 封装 patch 请求
export const patch = (url: string, data?: any) => {
  const token = getToken();
  const AUTH_TOKEN = `Token ${token}`;
  return axios
    .patch(url, {
      data,
      headers: {
        Authorization: AUTH_TOKEN,
      },
    })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

// 封装 deleter 请求
export const deleter = (url: string) => {
  const token = getToken();
  const AUTH_TOKEN = `Token ${token}`;
  return axios
    .delete(url, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

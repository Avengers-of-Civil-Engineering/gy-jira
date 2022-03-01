import axios from "axios";
import { RegisterForm } from "types/auth";

// const apiUrl = process.env.REACT_APP_API_URL;
// axios.defaults.baseURL = apiUrl;

const localStorageKey = "__auth_provider_token__";

// 获取本地 token
export const getToken = () => localStorage.getItem(localStorageKey);

// // 请求成功时，在本地存储 token
// export const handleUserResponse = ({ token, user }: { token: string, user: User }) => {
//   localStorage.setItem(localStorageKey, token || "");
//   return user;
// };

export const login = (data: { username: string; password: string }) => {
  return axios
    .post("/api/v1/api-token-auth/", data)
    .then((response) => {
      if (response.data) {
        // console.log("login-res", response);
        localStorage.setItem(localStorageKey, response.data?.token || "");
        return Promise.resolve(response.data?.user);
      } else {
        return Promise.reject(data);
      }
    })
    .catch((error) => {
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log("error.response", error.response);
        return Promise.reject(error.response.data);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        console.log("error.request", error.request);
        return Promise.reject(error.request);
      } else {
        // 发送请求时出了点问题
        console.log("Error", error.message);
        return Promise.reject(error.message);
      }
      // console.log(error.config);
    });
};

export const register = (data: RegisterForm) => {
  return axios
    .post("/api/v1/users/", data)
    .then((response) => {
      if (response.data) {
        // console.log("register-res", response);
        return Promise.resolve(response.data?.user);
      } else {
        return Promise.reject(data);
      }
    })
    .catch((error) => {
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log("error.response", error.response);
        return Promise.reject(error.response.data);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        console.log("error.request", error.request);
        return Promise.reject(error.request);
      } else {
        // 发送请求时出了点问题
        console.log("Error", error.message);
        return Promise.reject(error.message);
      }
      // console.log(error.config);
    });
};

export const logout = async () => localStorage.removeItem(localStorageKey);

// 获取用户信息
export const getUser = (token: string) => {
  const AUTH_TOKEN = `Token ${token}`;
  return axios
    .get("/api/v1/users/about-me/", {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    })
    .then((response) => {
      if (response.data) {
        // console.log("me-res", response);
        return response.data;
      }
    });
};

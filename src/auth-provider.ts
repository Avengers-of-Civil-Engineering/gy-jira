import axios from "axios";
import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = apiUrl;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  localStorage.setItem(localStorageKey, user?.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return axios.post("/api/vi/login", { data }).then((response) => {
    if (response.data) {
      return handleUserResponse(response.data);
    } else {
      return Promise.reject(data);
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return axios.post("/api/vi/register", { data }).then((response) => {
    if (response.data) {
      return handleUserResponse(response.data);
    } else {
      return Promise.reject(data);
    }
  });
};

export const logout = async () => localStorage.removeItem(localStorageKey);

export const getUser = (token: string) => {
  return axios
    .get("api/v1/me", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    });
};

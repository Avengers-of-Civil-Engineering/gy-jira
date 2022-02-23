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
  axios
    .post("/api/vi/login", { data })
    .then((response) => {
      if (response.data) {
        return handleUserResponse(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const register = (data: Partial<User>) => {
  axios
    .post("/api/vi/register", { data })
    .then((response) => {
      if (response.data) {
        return handleUserResponse(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = () => localStorage.removeItem(localStorageKey);

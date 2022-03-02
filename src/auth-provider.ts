import { User } from "types/user";

const localStorageKey = "__auth_provider_token__";

// 获取本地 token
export const getToken = () => localStorage.getItem(localStorageKey);

// 请求成功时，在本地存储 token
export const handleUserResponse = ({
  token,
  user,
}: {
  token: string;
  user: User;
}) => {
  localStorage.setItem(localStorageKey, token || "");
  return user;
};

// 清除本地 token
export const removeToken = async () => localStorage.removeItem(localStorageKey);

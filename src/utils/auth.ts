import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthForm, RegisterForm } from "types/auth";
import { User } from "types/user";
import { get } from "./request";

// 登陆
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Partial<AuthForm>) => axios.post("/api/v1/api-token-auth/", data),
    {
      onSuccess: () => queryClient.invalidateQueries("user"),
    }
  );
};

// 注册
export const useRegister = () => {
  return useMutation((data: Partial<RegisterForm>) =>
    axios.post("/api/v1/users/", data)
  );
};

// 获取用户信息
export const useAboutMe = () => {
  return useQuery<User, Error>(["user"], () => get("/api/v1/users/about-me/"));
};

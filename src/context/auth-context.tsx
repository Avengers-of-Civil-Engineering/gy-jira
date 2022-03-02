import React, { ReactNode, useContext, useEffect } from "react";
import { getToken, handleUserResponse, removeToken } from "auth-provider";
import { User } from "types/user";
import { AuthForm, RegisterForm } from "types/auth";
import { useQueryClient } from "react-query";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useAboutMe, useLogin, useRegister } from "utils/auth";

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: RegisterForm) => Promise<User>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { mutateAsync: loginRequest } = useLogin();
  const { mutateAsync: registerRequest } = useRegister();

  const {
    data: user = null,
    error,
    isError,
    isIdle,
    isLoading,
    refetch,
  } = useAboutMe();

  // 处理登陆逻辑
  const login = (form: AuthForm) =>
    loginRequest(form).then((response) => {
      handleUserResponse(response.data);
      refetch();
      return response.data.user;
    });

  // 处理注册逻辑
  const register = (form: RegisterForm) =>
    registerRequest(form).then((response) => response.data);

  // 处理等处逻辑
  const queryClient = useQueryClient();
  const logout = () =>
    removeToken().then(() => {
      refetch();
      // 登出时，清除用户信息
      queryClient.clear();
    });

  // 刷新时，初始化用户信息
  useEffect(() => {
    const token = getToken();
    if (token) {
      refetch();
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 调用 AuthContext 的 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};

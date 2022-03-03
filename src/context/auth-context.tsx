import React, { ReactNode, useCallback, useEffect } from "react";
import * as authStore from "store/auth.slice";
import { User } from "types/user";
import { AuthForm, RegisterForm } from "types/auth";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser } from "auth-provider";

// 初始化用户信息
export const bootstrapUser = async () => {
  let user = null;
  const token = getToken();
  // console.log("token-get", token);
  if (token) {
    const data = await getUser(token);
    // console.log("data-get", data);
    user = data;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const { run, isIdle, isLoading, isError, error } = useAsync<User | null>();

  // 刷新时，初始化用户信息
  useEffect(() => {
    run(dispatch(authStore.bootstrap()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <div>{children}</div>;
};

// 调用 AuthContext 的 Hook
export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  const user = useSelector(authStore.selectUser);

  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: RegisterForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };
};

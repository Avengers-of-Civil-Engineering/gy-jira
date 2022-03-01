import React, { ReactNode, useContext, useEffect } from "react";
import * as auth from "auth-provider";
import { User } from "types/user";
import { AuthForm, RegisterForm } from "types/auth";
import { useAsync } from "utils/use-async";
import { useQueryClient } from "react-query";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

// 初始化用户信息
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  // console.log("token-get", token);
  if (token) {
    const data = await auth.getUser(token);
    // console.log("data-get", data);
    user = data;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: RegisterForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    setData: setUser,
    run,
    isIdle,
    isLoading,
    isError,
    error,
  } = useAsync<User | null>();

  const queryClient = useQueryClient();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: RegisterForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      // 登出时，清除用户信息
      queryClient.clear();
    });

  // 刷新时，初始化用户信息
  useEffect(() => {
    run(bootstrapUser());
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

import React, { ReactNode, useContext, useEffect, useState } from "react";
import * as auth from "auth-provider";
import { User } from "types/user";
import { AuthForm, RegisterForm } from "types/auth";

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
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: RegisterForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useEffect(() => {
    bootstrapUser().then(setUser);
  }, []);

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

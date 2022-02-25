import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <Router>{children}</Router>
    </AuthProvider>
  );
};

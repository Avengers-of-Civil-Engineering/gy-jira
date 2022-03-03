import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";
import { Provider } from "react-redux";
import { store } from "store";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

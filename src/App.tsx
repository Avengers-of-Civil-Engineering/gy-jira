import React from "react";
import "./App.css";
import { UnauthenticatedApp } from "unauthenticated-app";
import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { getToken } from "auth-provider";

function App() {
  const token = getToken();
  const { user } = useAuth();

  return (
    <div className="App">
      {user && token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      {/* <AuthenticatedApp /> */}
      {/* <UnauthenticatedApp /> */}
    </div>
  );
}

export default App;

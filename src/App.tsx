import React from "react";
import "./App.css";
import { UnauthenticatedApp } from "unauthenticated-app";
import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { getToken } from "auth-provider";

function App() {
  const token = getToken();
  console.log("token", token);
  const { user } = useAuth();
  console.log("user", user);

  return (
    <div className="App">
      {/* {token && user ? <AuthenticatedApp /> : <UnauthenticatedApp />} */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;

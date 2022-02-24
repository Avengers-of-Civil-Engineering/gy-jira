import { AuthenticatedApp } from "authenticated-app";
// import { AppProviders } from "context";
// import { useAuth } from "context/auth-context";
import React from "react";
// import { UnauthenticatedApp } from "unauthenticated-app";
import "./App.css";

function App() {
  // const { user } = useAuth()

  return (
    <div className="App">
      {/* <AppProviders> */}
      {/* { user ? <AuthenticatedApp /> : <UnauthenticatedApp /> } */}
      <AuthenticatedApp />
      {/* <UnauthenticatedApp /> */}
      {/* </AppProviders> */}
    </div>
  );
}

export default App;

import "./App.css";
import { UnauthenticatedApp } from "unauthenticated-app";
import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";

function App() {
  const { user } = useAuth();
  // console.log("user", user);

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;

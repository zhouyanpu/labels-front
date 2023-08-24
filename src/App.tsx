import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./components/login";
import Labels from "./components/labels";
// import Show from "./components/show";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  const handleLogin = (data: any, name: any) => {
    setToken(data);
    setUsername(name);
    // console.log("hey    " + name);
  };
  const handleSignOut = (data: any) => {
    setTimeout(() => {
      setToken(null);
    }, 200);
  };

  return (
    <div className="App">
      {!token && <Login onLogin={handleLogin} />}
      {token && <Labels onSignOut={handleSignOut} tk={token} name={username} />}
    </div>
  );
}

export default App;

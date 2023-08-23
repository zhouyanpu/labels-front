import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import "./login.css";
import axios, { AxiosError } from "axios";

interface User {
  email: string;
  name: string;
}

function Login({ onLogin }) {
  const [log, setLog] = useState(true);
  const [eamil, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState<User[]>([]);
  const [msg, setMsg] = useState("");

  const gogogo = () => {
    setTimeout(() => {
      setLog(!log);
    }, 120);
    setName("");
    setEmail("");
    setPassword("");
  };

  const submit = async (ev: MouseEvent) => {
    console.log({
      eamil,
      password,
      name,
    });
    // console.log(users);
    if (log) {
      try {
        setMsg("Logging in ...");
        let res = await axios.post("http://52.14.248.3:8000/auth/jwt/create", {
          username: name,
          password: password,
        });
        console.log(res.data);
        // localStorage.setItem("token", res.data);
        onLogin(res.data, name);
      } catch (err) {
        console.log(Object.values(err.response.data)[0]);
        setMsg(Object.values(err.response.data)[0]);
        setTimeout(() => {
          setMsg("");
        }, 2000);
      }
    } else {
      try {
        console.log("to register");
        let res = await axios.post("http://52.14.248.3:8000/auth/users/", {
          username: name,
          email: eamil,
          password: password,
        });
        console.log(res.data);
        let res2 = await axios.post("http://52.14.248.3:8000/register/", {
          name: name,
          email: eamil,
          password: password,
        });
        console.log(res2.data);
        setMsg("Register Successful!");
        setTimeout(() => {
          setMsg("Signing in...");
        }, 1000);
        let res3 = await axios.post("http://52.14.248.3:8000/auth/jwt/create", {
          username: name,
          password: password,
        });
        // console.log(res3.data);
        // localStorage.setItem("token", res.data);
        setTimeout(() => {
          onLogin(res.data, name);
        }, 1300);
      } catch (err) {
        console.log((err as AxiosError).response?.data);
        // console.log(Object.values(err.response.data)[0][0]);
        setMsg(Object.values(err.response.data)[0][0]);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      }
    }
  };

  const inchange = async (ev: ChangeEvent) => {
    if (ev.target.name == "name") {
      //   console.log(ev.target.value);
      setName(ev.target.value);
    } else if (ev.target.name == "email") {
      setEmail(ev.target.value);
    } else if (ev.target.name == "password") {
      setPassword(ev.target.value);
    }
    // console.log(name);
  };

  //    https://jsonplaceholder.typicode.com/users
  useEffect(() => {
    axios.get<User[]>("http://52.14.248.3:8000/").then((res) => {
      console.log(res.data);
      // setUsers(res.data);
    });
  }, []);

  return (
    <>
      {log && (
        <div className="loginbox">
          <h1 className="login">LOGIN</h1>
          <input
            name="name"
            onChange={(ev) => inchange(ev)}
            type="text"
            placeholder="UserName"
          />
          <input
            name="password"
            onChange={(ev) => inchange(ev)}
            type="password"
            placeholder="Password"
          />
          <div className="errbox">
            <div className="msg">{msg}</div>
          </div>
          <div className="btnbox">
            <button onClick={(ev) => submit(ev)} className="loginbtn">
              Login
            </button>
            <button
              onClick={() => {
                gogogo();
              }}
              className="loginbtn"
            >
              Sign up
            </button>
          </div>
        </div>
      )}
      {!log && (
        <div className="loginbox">
          <h1 className="login regi">SIGN UP</h1>
          <input
            className="reg"
            name="name"
            onChange={(ev) => inchange(ev)}
            type="text"
            placeholder="Username"
          />
          <input
            className="reg"
            name="email"
            onChange={(ev) => inchange(ev)}
            type="text"
            placeholder="Email"
          />
          <input
            className="reg"
            name="password"
            onChange={(ev) => inchange(ev)}
            type="password"
            placeholder="Password"
          />
          <div className="errbox">
            <div className="msg">{msg}</div>
          </div>
          <div className="btnbox">
            <button onClick={(ev) => submit(ev)} className="loginbtn">
              Register
            </button>
            <button
              onClick={() => {
                gogogo();
              }}
              className="loginbtn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;

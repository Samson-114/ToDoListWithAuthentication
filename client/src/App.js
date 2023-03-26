import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import Axios from "axios";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") != null
      ? localStorage.getItem("isAuth")
      : false
  );
  const [token, setToken] = useState("");
  const [list, setLIst] = useState([]);

  const handleAuth = (val) => {
    setIsAuth(val);
  };
  const handlelogin = (token) => {
    setToken(token);
  };
  const modifyList = async (newList) => {
    setLIst(newList);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Home
                handleAuth={handleAuth}
                list={list}
                modifyList={modifyList}
                token={token}
              />
            ) : (
              <Login
                handleAuth={handleAuth}
                token={token}
                handlelogin={handlelogin}
              />
            )
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

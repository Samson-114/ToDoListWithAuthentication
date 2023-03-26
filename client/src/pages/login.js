import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserId, selectUserInfo } from "../user/userInfo";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Login = (props) => {
  // const userInfo = useSelector(selectUserInfo);
  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameCorrect, setIsUsernameCorrect] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [msg, setMsg] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPasswordCorrect(true);
    setIsUsernameCorrect(true);

    try {
      const res = await Axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status == 200) {
        props.handlelogin(res.data.token);
        localStorage.setItem("token", res.data.token);
        props.handleAuth(true);
        localStorage.setItem("isAuth", true);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status == "400") {
        setIsUsernameCorrect(false);
        setMsg(error.response.data.msg);
      } else if (error.response.status == "401") {
        setIsPasswordCorrect(false);
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <>
      <div className="form">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <label for="username">Username</label>
          <br />
          {!isUsernameCorrect && <p className="warning">{msg}</p>}
          <input type="text" id="username" onChange={handleUsername} required />
          <br />
          <label for="password">Password</label>
          <br />
          {!isPasswordCorrect && <p className="warning">{msg}</p>}
          <input
            type="password"
            id="password"
            onChange={handlePassword}
            required
          />
          <br />
          <input type="submit" value="login" />
        </form>
        <Link to="/register">don't have account, register</Link>
      </div>
    </>
  );
};

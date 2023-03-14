import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserId, selectUserInfo } from "../user/userInfo";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  // const userInfo = useSelector(selectUserInfo);
  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(updateUserId("hello"));
    const res = await Axios.post("http://localhost:8080/api/auth/login", {
      username: username,
      password: password,
    });

    if (res.status == 200) {
      navigate("/home");
    }
  };
  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <label for="username">Username</label>
        <br />
        <input type="text" id="username" onChange={handleUsername} required />
        <br />
        <label for="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          onChange={handlePassword}
          required
        />
        <br />
        <input type="submit" value="login" />
        <br />
      </form>
    </>
  );
};

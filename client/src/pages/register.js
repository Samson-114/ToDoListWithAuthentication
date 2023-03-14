import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateToken, selectUserInfo } from "../user/userInfo";

export const Register = (props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post("http://localhost:8080/api/auth/register", {
        username: username,
        password: password,
      });

      if (parseInt(res.status) == 200) {
        dispatch(updateToken({ userId: "", token: res.data.token }));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <br />
        <input
          type="text"
          placeholder="username"
          onChange={handleUsername}
          required
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={handlePassword}
          required
        />
        <br />
        <input type="submit" />
        <br />
      </form>
    </>
  );
};

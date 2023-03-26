import { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateToken, selectUserInfo } from "../user/userInfo";

export const Register = (props) => {
  const dispatch = useDispatch();

  const [isPasswordSafe, SetIsPasswordSafe] = useState(true);
  const [isUsernameRepeated, setIsUsernameRepeated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUsernameRepeated(false);
    SetIsPasswordSafe(true);

    if (password.length < 6) {
      SetIsPasswordSafe(false);
      return;
    }
    try {
      const res = await Axios.post("http://localhost:8080/api/auth/register", {
        username: username,
        password: password,
      });

      if (parseInt(res.status) == 200) {
        dispatch(updateToken({ userId: "", token: res.data.token }));
        navigate("/");
      }
    } catch (error) {
      if (error.response.status == "409") {
        setMsg(error.response.data.err);
        setIsUsernameRepeated(true);
      }
    }
  };

  return (
    <div className="formContainer">
      <h1 className="formTitle">Register Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="labelContainer">
          <label>Username</label>
        </div>
        {/* <br /> */}
        <div>
          {true && <p className="warning">{msg}</p>}
          <input type="text" onChange={handleUsername} required />
        </div>
        {/* <br /> */}
        <div className="labelContainer">
          <label>Password</label>
        </div>
        {/* <br /> */}
        <div>
          {!isPasswordSafe && (
            <p className="warning">password has to be at least 6 character</p>
          )}
        </div>
        <div>
          <input type="password" onChange={handlePassword} required />
        </div>
        {/* <br /> */}
        <div className="submitContainer">
          <input type="submit" value="register" />
        </div>
      </form>
      <Link to="/">already have account, login</Link>
    </div>
  );
};

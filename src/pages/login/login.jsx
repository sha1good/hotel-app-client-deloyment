import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const reactBaseUrl = process.env.REACT_APP_BASE_URL;

  const [credentials, setCredentails] = useState({
    username: undefined,
    password: undefined,
  });

  const {error, loading, dispatch } = useContext(AuthContext);

  const handleChnage = (event) => {
    setCredentails((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleClick = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(
        `${reactBaseUrl}/auth/login`,
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details});
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
 return (
    <div className="login">
      <div className="loginContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChnage}
          className="lgInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChnage}
          className="lgInput"
        />
        <button
          disabled={loading}
          onClick={handleClick}
          className="inputButton"
        >
          Login
        </button>

        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;

import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const [isWarning, setIsWarning] = useState(false)
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (userRef.current.value && passwordRef.current.value) {
    setIsWarning(false)
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      setIsWarning(true)
      dispatch({ type: "LOGIN_FAILURE" });
    }
  } else {
    setIsWarning(true)
  }
  
};

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username(ex-esti007)</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password(ex-45678)</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
      {isWarning && 
      <p style={{color:"red", marginTop:"10px", letterSpacing:"1px"}}>
        Something went wrong!</p>}
    </div>
  );
}

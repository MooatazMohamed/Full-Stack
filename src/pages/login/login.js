import React from "react";
import '../product/style/login.css'
const Login = () => {
  return (
    <div className="container" id="container">
      <div className="form-container log-in-container">
        <form action="#" className="login-form">
          <h1 className="login">Login</h1>
          <span className="anouther-account">or use your account</span>
          <input type="email" placeholder="Email" className="text-field"/>
          <input type="password" placeholder="Password" className="pass-field"/>
          <a href="#">Forgot your password?</a>
          <button className="login-button" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};
export default Login;

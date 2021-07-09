import './Login.css';
import React from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <div className="login">
      <h2>Sign in to I-Shadow</h2>
      <div className="login-form">
        <form id="login-form" action="" method="POST">
          <label htmlFor="">Email</label>
          <br/>
          <input type="text"/>
          <br/>
          <label htmlFor="">Password</label>
          <br/>
          <input type="password"/>
          <br/>
          <button type="submit" className="btn_submit">Sign in</button>
        </form>
      </div>

      <div className="login-with-sns">
        <FcGoogle id="google-icon"/>
        <button>
          sign in with google
        </button>
      </div>
    </div>
  );
}

export default Login;

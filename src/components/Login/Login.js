import './Login.css';
import React from "react";

function Login() {
  return (
    <div className="login">
      <h2>Sign in to I-Shadow</h2>
      <form action="" method="POST">
        <label htmlFor="">ID</label>
        <br/>
        <input type="text"/>
        <br/>
        <label htmlFor="">Password</label>
        <br/>
        <input type="password"/>
        <br/>
        <button type="submit">Sign in</button>
      </form>
      <button>
        sign in with google
      </button>
    </div>
  );
}

export default Login;

import './Signup.css';
import React from "react";

function Signup() {
  return (
    <div className="signup">
      <h2>Sign up to I-Shadow</h2>
      <form action="" method="POST">
        <label htmlFor="">ID</label>
        <br/>
        <input type="text"/>
        <br/>
        <label htmlFor="">Password</label>
        <br/>
        <input type="password"/>
        <br/>
        <label htmlFor="">email</label>
        <br/>
        <input type="email"/>
        <br/>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;

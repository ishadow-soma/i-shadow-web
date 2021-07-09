import './Signup.css';
import React from "react";

function Signup() {
  return (
    <div className="signup">
      <h2>Sign up to I-Shadow</h2>
      <div className="signup-form">
        <form action="" method="POST">
          <label htmlFor="">Email</label> <br/>
          <input type="email"/> <br/>
          <label htmlFor="">Password</label> <br/>
          <input type="password"/> <br/>
          <button type="submit" className="btn_submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

import './Header.css';
import React from "react";
import {Link} from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="logo">
        <h1>i-Shadow</h1>
        <Link to="/">home</Link>
        <Link to="/MyRoom">my room</Link>
      </div>

      <div className="profile">
        <Link to="/login">log in</Link>
        <Link to="/signup" className="sign-up">sign up</Link>
      </div>
    </header>
  );
}

export default Header;
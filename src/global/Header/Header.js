import './Header.css';
import React from "react";
import {Link} from "react-router-dom";

function Header() {
  return (
    <header>
      <h2>i-Shadow</h2>
      <Link to="/">home</Link>
      <Link to="/MyRoom">my room</Link>
      <Link to="/login">log in</Link>
      <Link to="/signup">sign up</Link>
    </header>
  );
}

export default Header;
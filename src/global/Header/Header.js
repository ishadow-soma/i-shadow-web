import './Header.css';
import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <div className="link">
          <Link to="/">Home</Link>
        </div>
        <div className="link">
          <Link to="/login">Log in</Link>
        </div>
        <div className="link">
          <Link to="/signup">Sign up</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
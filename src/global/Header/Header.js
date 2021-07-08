import './Header.css';
import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

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

      <Switch>
        <Route path="/" component={Login}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
      </Switch>
    </header>
  );
}

export default Header;
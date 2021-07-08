import './Header.css';
import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

function Header() {
  return (
    <header>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
        <Switch>
          <Route path="/" component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
      </BrowserRouter>
    </header>
  );
}

export default Header;
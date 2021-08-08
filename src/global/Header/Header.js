import './Header.css';
import React from "react";
import {Link} from "react-router-dom";
import {user} from "../store/store";

function Header() {
  const onLogout = () => {
    user.token = null;
    user.email = null;
    user.isLogin = null;
    user.name = null;
  }

  return (
    <header>
      <div className="logo">
        <h1>i-Shadow</h1>
        <Link to="/">home</Link>
        <Link to="/MyRoom">my room</Link>
      </div>

      <div className="profile">
        <div style={user.isLogin ? {display: "none"} : null}>
          <Link to="/login">log in</Link>
          <Link to="/signup" className="sign-up">sign up</Link>
        </div>
        <div className="authenticated" style={user.isLogin ? null : {display: "none"}}>
          <div><Link to="/editprofile" className="profile-info">{user.email}</Link> 님, 안녕하세요!</div>
          <Link to="/" className="log-out" onClick={onLogout}>Log out</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
import './Header.css';
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {user} from "global/store/store";

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
        {/* 로그인 안 됐을 때 */}
        <div style={user.isLogin ? {display: "none"} : null}>
          <Link to="/login">log in</Link>
          <Link to="/signup" className="sign-up">sign up</Link>
        </div>
        {/* 로그인 됐을 때 */}
        <div className="authenticated" style={user.isLogin ? null : {display: "none"}}>
          <div><Link to="/editprofile" className="profile-info">{user.email}</Link> 님, 안녕하세요!</div>
          <Link to="/" className="log-out" onClick={onLogout}>Log out</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
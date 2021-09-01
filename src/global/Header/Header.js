import './Header.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {user} from "global/store/store";

function Header(props) {
  // eslint-disable-next-line no-unused-vars
  const [render, setRender] = useState(false);

  useEffect(() => {
    if(user.isLogin) return;

    user.verifyLogin();
    setTimeout(() => {
      setRender(true);
    }, 200);
  }, [])

  const onLogout = () => {
    user.logout();
  }

  return (
    <header>
      <div className="logo">
        <h1>i-Shadow</h1>
        <Link to="/">home</Link>
        <Link to="/MyRoom">my room</Link>
      </div>

      <div className="profile">
        { user.isLogin
          ?
          <div className="authenticated">
            <div><Link to="/editprofile" className="profile-info">{user.email}</Link> 님, 안녕하세요!</div>
            <Link to="/" className="log-out" onClick={onLogout}>Log out</Link>
          </div>
          :
          <div className="unauthorized">
            <Link to="/login">log in</Link>
            <Link to="/signup" className="sign-up">sign up</Link>
          </div>
        }
      </div>
    </header>
  );
}

export default Header;
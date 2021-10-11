import "./Header.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { user } from "global/store/store";

function Header(props) {
  const [, setRender] = useState(false);

  useEffect(async () => {
    const flag = await user.verifyLogin();
    if (flag) {
      setRender(true);
      if (props.doAfterLogin) {
        props.doAfterLogin();
      }
    }
  }, []);

  const onLogout = () => {
    user.logout();
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>i-Shadow</h1>
          </Link>
          <Link to="/" className="nav">
            home
          </Link>
          <Link to="/MyRoom" className="nav">
            my room
          </Link>
        </div>

        <div className="profile">
          {user.isLogin ? (
            <div className="authenticated">
              <div className="welcome">
                <Link to="/editprofile" className="profile-info">
                  {user.email}
                </Link>{" "}
                님, 안녕하세요!
              </div>
              <Link to="/" className="log-out" onClick={onLogout}>
                Log out
              </Link>
            </div>
          ) : (
            <div className="unauthorized">
              <Link to="/login">log in</Link>
              <Link to="/signup" className="sign-up">
                sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

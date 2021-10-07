import "./Login.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import network from "global/store/store";
import { setCookieDefaultOption } from "global/store/cookie";
import setGoogleLogin from "global/Oauth/setGoogleLogin";
import logOnlyDevelopment from "../../../global/log/log";
const { naver } = window;
require("dotenv").config();

function Login(props) {
  useEffect(() => {
    initializeNaverLogin();
    setGoogleLogin(props);
  });

  /* 일반 로그인 */
  const normalLogin = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // 로그인 시도
    await axios
      .post(network.baseURL + "login", {
        email: email,
        password: password,
        sns: "NORMAL",
      })
      .then((res) => {
        if (res.data.success) {
          setCookieDefaultOption("jwt", res.data.data.jwt);
          logOnlyDevelopment("일반 로그인 성공", res);
          props.history.push("/");
        } else {
          logOnlyDevelopment("일반 로그인 실패", res);
          alert("로그인 실패");
        }
      })
      .catch((err) => logOnlyDevelopment("일반 로그인 실패", err));
    setTimeout(() => window.location.reload(), 100);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      normalLogin();
    }
  };

  /* 네이버 로그인 */
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: `${process.env.REACT_APP_NAVER_CALLBACK_URL}`,
      isPopup: false,
    });
    naverLogin.init();
  };

  // 렌더링
  return (
    <div className="login">
      <div className="flex-left">
        <h1>log in</h1>
        <div className="input">
          <span>
            <i className="xi-at" />
          </span>
          <input id="email" type="text" placeholder="Email" />
        </div>

        <br />
        <div className="input">
          <span>
            <i className="xi-lock-o" />
          </span>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onKeyPress={onKeyPress}
          />
        </div>
        <br />
        <button className="btn-submit" onClick={normalLogin}>
          log in
        </button>

        <Link to="/findpassword" className="find-password">
          Forgot password?
        </Link>
        <p className="or">or</p>
        {/* sns 로그인 */}
        <div className="sns-login">
          <div id="naverIdLogin">
            <p id="naverIdLogin_loginButton">
              <i className="xi-naver" />
              Log in with naver
            </p>
          </div>
          <div id="gSignInWrapper">
            <div id="customBtn" className="customGPlusSignIn">
              <span className="google-icon" />
              <span className="buttonText">Log in with google</span>
            </div>
          </div>
        </div>
        <p>
          Don't have and accound? <Link to="/signup">sign up</Link>
        </p>
      </div>

      <div className="flex-right">
        <span className="member" />
        <div>
          <h2>
            Welcome back to <br />
            i-Shadow.
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
            eligendi ex magnam minima perferendis quisquam ratione, sunt totam?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

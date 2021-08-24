import './Login.css';
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import http, {user} from "global/store/store";
import {setCookie} from "../../global/store/cookie";
const { naver } = window;
let { gapi, auth2 } = window;
require('dotenv').config();

function Login(props) {
  useEffect(() => {
    initializeNaverLogin();
    startApp();
  }, );

  /* 일반 로그인 */
  const normalLogin = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // 로그인 시도
    axios.post(http.baseURL + "login",
      {
        "email": email,
        "password": password,
        "sns": "NORMAL"
      }).then(res => {

      if(res.data.success) {
        setCookie('jwt', res.data.data.jwt, {
          path: "/",
          secure: true,
          sameSite: "none"
        });
        console.log("일반 로그인 성공");
        console.log(res);
        props.history.push("/");
      }

      else {
        console.log("일반 로그인 실패");
        console.log(res);
        alert("로그인 실패");
      }
    }).catch(err => {

      console.log("일반 로그인 실패");
      console.log(err)
    });
  }

  /* 네이버 로그인 */
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: false,
    });
    naverLogin.init();
  }

  /* 구글 로그인 */
  var startApp = function() {
    gapi.load('auth2', function(){
      auth2 = gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
      });
      attachSignin(document.getElementById('customBtn'));
    });
  };

  function attachSignin(element) {
    if(element === null) return;
    auth2.attachClickHandler(element, {},
      function(googleUser) {
        console.log(googleUser);
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  // 렌더링
  return (
    <div className="login">
      <div className="flex-left">
        <h1>log in</h1>
        <div className="input">
          <span><i className="xi-at"/></span>
          <input id="email" type="text" placeholder="Email"/>
        </div>

        <br/>
        <div className="input">
          <span><i className="xi-lock-o"/></span>
          <input id="password" type="password" placeholder="Password"/>
        </div>
        <br/>
        <button className="btn-submit" onClick={normalLogin}>log in</button>

        <Link to="/findpassword" className="find-password">Forgot password?</Link>
        <p className="or">or</p>
        {/* sns 로그인 */}
        <div className="sns-login">
          <div id='naverIdLogin'>
            <p id="naverIdLogin_loginButton"><i className="xi-naver"/>Log in with naver</p>
          </div>
          <div id="gSignInWrapper">
            <div id="customBtn" className="customGPlusSignIn">
              <span className="google-icon"/>
              <span className="buttonText">Log in with google</span>
            </div>
          </div>
        </div>
        <p>Don't have and accound? <Link to="/signup">sign up</Link></p>
      </div>

      <div className="flex-right">
        <span className="member"/>
        <div>
          <h2>Welcome back to <br/>
            i-Shadow.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eligendi ex magnam minima perferendis quisquam ratione, sunt totam?</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
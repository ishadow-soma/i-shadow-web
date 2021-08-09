import './Login.css';
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import http from "global/store/store";
import {user} from "global/store/store";
const { naver } = window;
let { gapi, auth2 } = window;
require('dotenv').config();

function Login(props) {
  useEffect(() => {
    initializeNaverLogin();
    startApp();
  }, );

  // 로그인
  const requestLogin = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    axios.post(http.baseURL + "login", {
      "email": email,
      "password": password,
      "sns": "NORMAL"
    })
      .then((res) => {
        if(res.data.success) {
          user.token = res.data.jwt;
          user.isLogin = true;
          user.email = email;
          console.log(res);
          console.log(user);
          alert("로그인 완료");
          props.history.push("/");
        }
        else {
          console.log(res);
          alert("로그인 실패");
        }
      });
  }

  // 네이버 로그인
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/',
      isPopup: false,
    });
    naverLogin.init();
  }

  /* 구글 로그인 */
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('customBtn'));
    });
  };

  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
      function(googleUser) {
        console.log(googleUser.Ts.Me);
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
        <button className="btn-submit" onClick={requestLogin}>log in</button>

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
import './Login.css';
import React, {useEffect} from "react";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";
const { naver } = window;
require('dotenv').config();

function Login(props) {
  // 네이버 로그인
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/',
      isPopup: false,
      loginButton: {color: 'white', type: 3, height: '47'},
    })
    naverLogin.init();
  }

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const onSuccessGoogle = (res) => {
    alert(res.profileObj.email);
    alert(res.profileObj.name);
  }

  const onFailureGoogle = (res) => {
    alert('login 실패');
  }

  // 렌더링
  return (
    <div className="login">
      <h2>Sign in to I-Shadow</h2>
      <div className="login-form">
        <form id="login-form" action="" method="POST">
          <label htmlFor="">Email</label>
          <br/>
          <input type="text"/>
          <br/>
          <label htmlFor="">Password</label>
          <br/>
          <input type="password"/>
          <br/>
          <button type="submit" className="btn_submit">Sign in</button>
        </form>
      </div>

      <div className="login-with-sns">
        <FcGoogle id="google-icon"/>
        <button>
          sign in with google
        </button>
      </div>
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
      <div id='naverIdLogin'></div>
      <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                   onSuccess={onSuccessGoogle}
                   onFailure={onFailureGoogle}
                   cookiePolicy='single_host_origin'/>
    </div>
  );
}

export default Login;
import './Login.css';
import React, {useEffect, useState} from "react";
import { FcGoogle } from "react-icons/fc";
const { naver } = window;

function Login(props) {
  // 네이버 로그인
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'VtMBj6R5IJ4fxRf8oPvJ',
      callbackUrl: 'http://localhost:3000/',
      isPopup: false,
      loginButton: {color: 'white', type: 3, height: '47'},
    })
    naverLogin.init();
  }

  useEffect(() => {
    initializeNaverLogin();
  }, []);


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
      <div id='naverIdLogin'></div>
    </div>
  );
}

export default Login;
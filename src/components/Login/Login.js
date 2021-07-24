import './Login.css';
import React, {useEffect} from "react";
import { FcGoogle } from "react-icons/fc";
const { naver } = window;

function Login() {
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

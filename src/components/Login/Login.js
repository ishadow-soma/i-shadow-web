import './Login.css';
import React, {useEffect} from "react";
import GoogleLogin from "react-google-login";
import {Link} from "react-router-dom";
const { naver } = window;
require('dotenv').config();

function Login(props) {
  // 네이버 로그인
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/',
      isPopup: false,
      loginButton: {color: 'white', type: 3, height: '67'},
    })
    naverLogin.init();
  }

  /* 구글 로그인 */
  // 성공
  const onSuccessGoogle = (res) => {
    console.log(res)
    alert(res.profileObj.email);
    alert(res.profileObj.name);
  }
  // 실패
  const onFailureGoogle = (res) => {
    alert('login 실패');
  }

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  // 렌더링
  return (
    <div className="login">
      <div className="flex-left">
        <h1>log in</h1>

        <form id="login-form" action="" method="POST">
          <input type="text" placeholder="Email"/>
          <br/>
          <input type="password" placeholder="Password"/>
          <br/>
          <button type="submit" className="btn-submit">log in</button>
        </form>
        <Link to="/findpassword" className="find-password">Forgot password?</Link>
        <p className="or">or</p>
        <div className="sns-login">
          <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                       onSuccess={onSuccessGoogle}
                       onFailure={onFailureGoogle}
                       cookiePolicy='single_host_origin'/>
          <div id='naverIdLogin'/>
        </div>
        <p>Don't hav and accound? <Link to="/signup">sign up</Link></p>
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
import './Login.css';
import React, {useEffect} from "react";
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
          <button type="submit" className="btn_submit">log in</button>
        </form>
        <a href="">Forgot password?</a>
        <p>or</p>
        <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                     onSuccess={onSuccessGoogle}
                     onFailure={onFailureGoogle}
                     cookiePolicy='single_host_origin'/>
        <div id='naverIdLogin'></div>
        <p>Don't hav and accound? <a href="">sign up</a></p>
      </div>

      <div className="flex-right">
        <img src="/src/asset/member.jpg" alt="conversation"/>
        <h2>Welcome back to i-Shadow.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eligendi ex magnam minima perferendis quisquam ratione, sunt totam?</p>
      </div>
    </div>


  );
}

export default Login;
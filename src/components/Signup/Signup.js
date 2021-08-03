import './Signup.css';
import React, {useEffect} from "react";
import GoogleLogin from "react-google-login";
const { naver } = window;

function Signup() {
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

  return (
    <div className="sign-up-page">
      <div className="flex-left">
        <h1>sign up</h1>
        <div className="signup-form">
          <form action="" method="POST">
            <div className="email">
              <div className="input">
                <span><i className="xi-at"/></span>
                <input type="text" placeholder="Email"/>
              </div>
              <a href="">인증번호 발송</a>
            </div>
            <div className="authorization">
              <div className="input">
                <span><i className="xi-shield-checked-o"/></span>
                <input type="text" placeholder="인증번호"/>
              </div>
              <p>인증번호가 일치하지 않습니다.</p>
              <a href="">인증하기</a>
            </div>
            <div className="password">
              <div className="input">
                <span><i className="xi-lock-o"/></span>
                <input type="password" placeholder="Password"/>
              </div>
              <div className="input">
                <span><i className="xi-lock"/></span>
                <input type="password" placeholder="Confirm Password"/>
              </div>
            </div>
            <button type="submit" className="btn-submit">Sign up</button>
            <p className="or">or</p>
            <div className="sns-login">
              <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                           onSuccess={onSuccessGoogle}
                           onFailure={onFailureGoogle}
                           cookiePolicy='single_host_origin'/>
              <div id='naverIdLogin'></div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-right">
        <span className="signup-background"/>
        <h2>Welcome back to <br/>
          i-Shadow.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eligendi ex magnam minima perferendis quisquam ratione, sunt totam?</p>
      </div>
    </div>
  );
}

export default Signup;

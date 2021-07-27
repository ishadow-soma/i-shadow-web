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

  return (
    <div>
      <div>
        <h1>sign up</h1>
        <div className="signup-form">
          <form action="" method="POST">
            <input type="email" placeholder="Email"/>
            <a href="">인증번호 발송</a>
            <input type="text" placeholder="인증번호"/>
            <p>인증번호가 일치하지 않습니다.</p>
            <input type="password" placeholder="Password"/>
            <input type="password" placeholder="Confirm Password"/>
            <a href="">인증하기</a>
            <button type="submit" className="btn_submit">Sign up</button>
            <p>or</p>
            <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                         onSuccess={onSuccessGoogle}
                         onFailure={onFailureGoogle}
                         cookiePolicy='single_host_origin'/>
            <div id='naverIdLogin'></div>
          </form>
        </div>
      </div>

      <div>
        <h2>Welcome back to i-Shadow.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eligendi ex magnam minima perferendis quisquam ratione, sunt totam?</p>
      </div>
    </div>
  );
}

export default Signup;

import './Signup.css';
import React, {useEffect} from "react";
const { naver } = window;
let { gapi, auth2 } = window;

function Signup() {
  useEffect(() => {
    initializeNaverLogin();
    startApp();
  }, []);

  // 네이버 로그인
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/',
      isPopup: false,
    })
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

import './Signup.css';
import React, {useEffect} from "react";
import axios from "axios";
import http from "global/store/store";
import {setCookie} from "global/store/cookie";
const { naver } = window;
let { gapi, auth2 } = window;

function Signup(props) {
  let isAuthentication = false;

  useEffect(() => {
    initializeNaverLogin();
    startApp();
  }, );

  // 이메일 중복 확인 및 인증번호 발송
  const requestAuthorizationCode = () => {
    const inputEmail = document.getElementById("email").value;
    // 중복 확인
    axios.post(http.baseURL + 'users/duplication-email', {"email": inputEmail})
      .then((res) => {
        if (res.data.data.isSuccess === "YES") {
          axios.post(http.baseURL + 'users/authentication-email', {"email": inputEmail});
          alert("인증번호가 발송되었습니다.");
        }
        else {
          alert("이미 가입된 이메일입니다.");
        }
      });
  }

  // 이메일 인증하기
  const requestAuthorization = () => {
    const code = document.getElementById("authorizationCode").value;
    axios.post(http.baseURL + 'users/authentication-code', {"authenticationCode": code})
      .then((res) => {
        if(res.data.data.isSuccess === "YES")
          isAuthentication = true;
      });
  }

  // 가입 완료
  const requestSignUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    if(password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if(!isAuthentication) {
      alert("이메일을 인증 받아야 합니다.");
      return;
    }

    axios.post(http.baseURL + 'users',
      {
        "name": email,
        "email": email,
        "password": password,
        "sns": "NORMAL"
      })
      .then((res) => {
        console.log(res);
        if(res.data.success) {
          alert("가입이 완료되었습니다.");
          props.history.push("/");
        }
        else {
          alert("알 수 없는 이유로 가입에 실패했습니다.");
        }
      });
  }

  // 네이버 로그인
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: `${process.env.REACT_APP_NAVER_CALLBACK_URL}`,
      isPopup: false,
    })
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
        axios({
          method: "post",
          url: http.baseURL + "users",
          data: {
            "name": googleUser.Ws.Pe,
            "email": "",
            "password": "",
            "sns": "GOOGLE",
            "userToken": googleUser.Zb.access_token
          }
        }).then(res => {
          // 신규 회원
          if(res.data.success) {
            setCookie('jwt', res.data.data.jwt, {
              path: "/",
              secure: true,
              sameSite: "none"
            })
            console.log("구글로 로그인 회원가입 및 로그인 성공");
            console.log(res);
          }
          else {
            axios.post(http.baseURL + "login", {
              "email": "",
              "password": "",
              "sns": "GOOGLE",
              "userToken": googleUser.Zb.access_token
            }).then(res => {
              if(res.data.success) {
                setCookie('jwt', res.data.data.jwt, {
                  path: "/",
                  secure: true,
                  sameSite: "none"
                })
                console.log("구글로 로그인 성공");
                console.log(res);
              }
              else
                console.log("구글로 로그인 실패");
            })
          }
        })
        props.history.push("/");
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  return (
    <div className="sign-up-page">
      <div className="flex-left">
        <h1>sign up</h1>
        <div className="signup-form">
          <div className="email">
            <div className="input">
              <span><i className="xi-at"/></span>
              <input id="email" type="text" placeholder="Email"/>
            </div>
            <button onClick={requestAuthorizationCode}>인증번호 발송</button>
          </div>
          <div className="authorization">
            <div className="input">
              <span><i className="xi-shield-checked-o"/></span>
              <input type="text" placeholder="인증번호" id="authorizationCode"/>
            </div>
            {
              isAuthentication
                ? <p style={{color: "#1A59FA"}}>인증되었습니다.</p>
                : <p style={{color: "#FF1100"}}>인증이 필요합니다.</p>
            }
            <button onClick={requestAuthorization}>인증하기</button>
          </div>
          <div className="password">
            <div className="input">
              <span><i className="xi-lock-o"/></span>
              <input id="password" type="password" placeholder="Password"/>
            </div>
            <div className="input">
              <span><i className="xi-lock"/></span>
              <input id="confirm-password" type="password" placeholder="Confirm Password"/>
            </div>
          </div>
          <button className="btn-submit" onClick={requestSignUp}>Sign up</button>
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

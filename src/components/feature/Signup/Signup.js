import "./Signup.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import network from "global/store/store";
import setGoogleLogin from "global/Oauth/setGoogleLogin";
const { naver } = window;

function Signup(props) {
  const [isAuthentication, setAuthentication] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    initializeNaverLogin();
    setGoogleLogin(props);
  });

  // 이메일 중복 확인 및 인증번호 발송
  const requestAuthorizationCode = () => {
    const inputEmail = document.getElementById("email").value;

    if (!validateEmail(inputEmail)) {
      alert("이메일 형식이 잘못되었습니다.");
      return;
    }

    // 중복 확인
    axios
      .post(network.baseURL + "users/duplication-email", { email: inputEmail })
      .then((res) => {
        if (res.data.data.isSuccess === "YES") {
          axios.post(network.baseURL + "users/authentication-email", {
            email: inputEmail,
          });
          setEmail(inputEmail);
          alert("인증번호가 발송되었습니다.");
        } else {
          alert("이미 가입된 이메일입니다.");
        }
      });
  };

  // 이메일 인증하기
  const requestAuthorization = () => {
    const code = document.getElementById("authorizationCode").value;
    axios
      .post(network.baseURL + "users/authentication-code", {
        authenticationCode: code,
      })
      .then((res) => {
        if (res.data.data.isSuccess === "YES") setAuthentication(true);
      });
  };

  // 가입 완료
  const requestSignUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    if (!validatePassword(password)) {
      alert(
        "유효하지 않은 비밀번호입니다. 문자와 숫자를 포함한 8~20자로 작성해 주세요."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isAuthentication) {
      alert("이메일을 인증 받아야 합니다.");
      return;
    }

    axios
      .post(network.baseURL + "users", {
        name: email,
        email: email,
        password: password,
        sns: "NORMAL",
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("가입이 완료되었습니다.");
          props.history.push("/");
        } else {
          alert("알 수 없는 이유로 가입에 실패했습니다.");
        }
      });
  };

  // 네이버 로그인
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: `${process.env.REACT_APP_NAVER_CALLBACK_URL}`,
      isPopup: false,
    });
    naverLogin.init();
  };

  return (
    <div className="sign-up-page">
      <h1>sign up</h1>
      <div className="signup-form">
        <div className="email">
          <div className="input">
            <span>
              <i className="xi-at" />
            </span>
            {isAuthentication ? (
              <input id="email" type="text" value={email} />
            ) : (
              <input id="email" type="text" placeholder="Email" />
            )}
          </div>
          <button onClick={requestAuthorizationCode}>인증번호 발송</button>
        </div>
        <div className="authorization">
          <div className="input">
            <span>
              <i className="xi-shield-checked-o" />
            </span>
            <input type="text" placeholder="인증번호" id="authorizationCode" />
          </div>
          {isAuthentication ? (
            <p style={{ color: "#1A59FA" }}>인증되었습니다.</p>
          ) : (
            <p style={{ color: "#FF1100" }}>인증이 필요합니다.</p>
          )}
          <button onClick={requestAuthorization}>인증하기</button>
        </div>
        <div className="password">
          <div className="input">
            <span>
              <i className="xi-lock-o" />
            </span>
            <input id="password" type="password" placeholder="Password" />
          </div>
          <div className="input">
            <span>
              <i className="xi-lock" />
            </span>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <button className="btn-submit" onClick={requestSignUp}>
          Sign up
        </button>
        <p className="or">or</p>
        <div className="sns-login">
          <div id="naverIdLogin">
            <p id="naverIdLogin_loginButton">
              <i className="xi-naver" />
              Log in with naver
            </p>
          </div>
          <div id="gSignInWrapper">
            <div id="customBtn" className="customGPlusSignIn">
              <span className="google-icon" />
              <span className="buttonText">Log in with google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

export function validateEmail(email) {
  const regExpression =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return email.match(regExpression) != null;
}

export function validatePassword(password) {
  const regExpression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  return password.match(regExpression) != null;
}

import React from "react";
import "./FindPassword.css"
import axios from "axios";
import network from "global/store/store";

function FindPassword() {
  let isAuthentication = false;

  // 인증번호 전송
  const requestAuthorizationCode = () => {
    const email = document.getElementById("email");
    // 유효한 이메일인지 확인
    axios.post(network.baseURL + "users/duplication-email", {"email": email})
      .then((res) => {
        if(res.data.isSuccess !== "YES") {
          alert("유효하지 않은 이메일입니다.");
          return;
        }

        axios.post(network.baseURL + "users/authentication-email", {"email": email});
        alert("인증번호가 전송되었습니다.");
      });
  }

  // 인증코드 확인
  const requestAuthorization = () => {
    const code = document.getElementById("authorizationCode");
    axios.post(network.baseURL + "user/authentication-code", {"authenticationCode": code})
      .then((res) => {
        if(res.data.isSuccess === "YES")
          isAuthentication = true;
      });
  }

  // 비밀번호 변경
  const requestNewPassword = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password");
    if(password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios.post(network.baseURL + 'users',
      {
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword
      })
      .then((res) => {
        if(res.data.isSuccess) alert("비밀번호가 변경되었습니다.");
        else alert("비밀번호 변경 실패 : " + res.code);
      });
  }

  return (
    <div className="find-password-page">
      <div className="flex-left">
        <h1>비밀번호 찾기</h1>
        <div className="">
          <form action="" method="POST">
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
                <input id="authorizationCode" type="text" placeholder="인증번호"/>
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
            <button className="btn-submit" onClick={requestNewPassword}>비밀번호 변경</button>
          </form>
        </div>
      </div>

      <div className="flex-right">
        <span className="find-password-background"/>
        <h2>
          Welcome back to <br/>
          i-Shadow.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eligendi ex magnam minima perferendis quisquam ratione, sunt totam?</p>
      </div>
    </div>
  );
}

export default FindPassword;

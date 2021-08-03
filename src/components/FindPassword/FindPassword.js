import React from "react";
import "./FindPassword.css"

function FindPassword() {

  return (
    <div className="find-password-page">
      <div className="flex-left">
        <h1>비밀번호 찾기</h1>
        <div className="">
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
            <button type="submit" className="btn-submit">비밀번호 변경</button>
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

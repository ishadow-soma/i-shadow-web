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
              <input type="email" placeholder="Email"/>
              <a href="">인증번호 발송</a>
            </div>
            <div className="authorization">
              <input type="text" placeholder="인증번호"/>
              <p>인증번호가 일치하지 않습니다.</p>
              <a href="">인증하기</a>
            </div>
            <div className="password">
              <input type="password" placeholder="New Password"/>
              <input type="password" placeholder="Confirm Password"/>
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

import React, {useEffect} from "react";

function FindPassword() {

  return (
    <div>
      <div>
        <h1>비밀번호 찾기</h1>
        <div className="signup-form">
          <form action="" method="POST">
            <input type="email" placeholder="Email"/>
            <a href="">인증번호 발송</a>
            <input type="text" placeholder="인증번호"/>
            <p>인증번호가 일치하지 않습니다.</p>
            <a href="">인증하기</a>
            <input type="password" placeholder="New Password"/>
            <input type="password" placeholder="Confirm Password"/>
            <button type="submit" className="btn_submit">비밀번호 변경</button>
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

export default FindPassword;

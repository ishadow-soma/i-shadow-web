import './Login.css';
import React from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <div className="login">
      <h2>Sign in to I-Shadow</h2>
      <div className="login-form">
        <form id="login-form" action="" method="POST">
          <label htmlFor="">Email</label>
          <br/>
          <input type="text"/>
          <br/>
          <label htmlFor="">Password</label>
          <br/>
          <input type="password"/>
          <br/>
          <button type="submit" className="btn_submit">Sign in</button>
        </form>
      </div>

      <div className="login-with-sns">
        <FcGoogle id="google-icon"/>
        <button>
          sign in with google
        </button>
      </div>
    </div>
  );
}

export default Login;

function login() {
  var naver_id_login = new naver_id_login("YOUR_CLIENT_ID", "YOUR_CALLBACK_URL");
  var state = naver_id_login.getUniqState();
  naver_id_login.setButton("white", 2,40);
  naver_id_login.setDomain("YOUR_SERVICE_URL");
  naver_id_login.setState(state);
  naver_id_login.setPopup();
  naver_id_login.init_naver_id_login();
}

/*
<!-- 네이버아이디로로그인 버튼 노출 영역 -->
<div id="naver_id_login"></div>
  <!-- //네이버아이디로로그인 버튼 노출 영역 -->
<script type="text/javascript">
  var naver_id_login = new naver_id_login("YOUR_CLIENT_ID", "YOUR_CALLBACK_URL");
  var state = naver_id_login.getUniqState();
  naver_id_login.setButton("white", 2,40);
  naver_id_login.setDomain("YOUR_SERVICE_URL");
  naver_id_login.setState(state);
  naver_id_login.setPopup();
  naver_id_login.init_naver_id_login();
</script>


<body>
<script type="text/javascript">
  var naver_id_login = new naver_id_login("YOUR_CLIENT_ID", "YOUR_CALLBACK_URL");
  // 접근 토큰 값 출력
  alert(naver_id_login.oauthParams.access_token);
  // 네이버 사용자 프로필 조회
  naver_id_login.get_naver_userprofile("naverSignInCallback()");
  // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
  function naverSignInCallback() {
    alert(naver_id_login.getProfileData('email'));
    alert(naver_id_login.getProfileData('nickname'));
    alert(naver_id_login.getProfileData('age'));
  }
</script>
</body>
</html>
*/
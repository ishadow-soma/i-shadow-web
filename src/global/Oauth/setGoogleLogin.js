import axios from "axios";
import network from "global/store/store";
import { setCookieDefaultOption } from "global/store/cookie";
let { auth2, gapi } = window;

export default function setGoogleLogin(props) {
  function startApp() {
    gapi.load("auth2", function () {
      auth2 = gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        cookiepolicy: "single_host_origin",
      });
      attachSignin(document.getElementById("customBtn"), props);
    });
  }

  function attachSignin(element, props) {
    if (element === null) return;
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const auth = googleUser.getAuthResponse();
        axios({
          method: "post",
          url: network.baseURL + "users",
          data: {
            name: googleUser.getBasicProfile().getName(),
            sns: "GOOGLE",
            userToken: auth.access_token,
          },
        }).then((res) => {
          // 신규 회원
          if (res.data.success) {
            setCookieDefaultOption("jwt", res.data.data.jwt);
            console.log("구글로 로그인 회원가입 및 로그인 성공", res);
          } else loginWithGoogle(googleUser);
          props.history.push("/");
        });
      },
      (err) => alert(JSON.stringify(err, undefined, 2))
    );
  }

  function loginWithGoogle(googleUser) {
    axios
      .post(network.baseURL + "login", {
        sns: "GOOGLE",
        userToken: googleUser.getAuthResponse().access_token,
      })
      .then((res) => {
        if (res.data.success) {
          setCookieDefaultOption("jwt", res.data.data.jwt);
          console.log("구글로 로그인 성공", res);
        } else console.log("구글로 로그인 실패");
      })
      .catch((err) => console.log(err));
  }

  startApp();
}

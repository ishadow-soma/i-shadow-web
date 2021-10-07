import axios from "axios";
import network from "global/store/store";
import { setCookieDefaultOption } from "global/store/cookie";
import logOnlyDevelopment from "../log/log";
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
            logOnlyDevelopment("구글로 로그인 회원가입 및 로그인 성공", res);
            props.history.push("/");
          } else {
            loginWithGoogle(googleUser).then((res) => props.history.push("/"));
          }
        });
      },
      (err) => alert(JSON.stringify(err, undefined, 2))
    );
  }

  async function loginWithGoogle(googleUser) {
    await axios
      .post(network.baseURL + "login", {
        sns: "GOOGLE",
        userToken: googleUser.getAuthResponse().access_token,
      })
      .then((res) => {
        if (res.data.success) {
          setCookieDefaultOption("jwt", res.data.data.jwt);
          logOnlyDevelopment("구글로 로그인 성공", res);
        } else logOnlyDevelopment("구글로 로그인 실패");
      })
      .catch((err) => logOnlyDevelopment(err));
  }

  startApp();
}

import axios from "axios";
import network from "../store/store";
import { setCookieDefaultOption } from "../store/cookie";

export default class Oauth {
  loginWithGoogle(googleUser) {
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
}

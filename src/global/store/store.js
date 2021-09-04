import {getCookie, setCookie} from "./cookie";
import axios from "axios";

export let user = {
  isLogin: false,
  token: null,
  email: null,
  name: null,
  gender: null,
  myPoint: 0,
  age: 0,

  // 로그인 확인 후 유저 정보 세팅
  verifyLogin: () => {
    user.token = getCookie("jwt")
    if(user.token == null)
      return;

    axios({
      method: "get",
      url: network.baseURL + "users",
      headers: {"ACCESS-TOKEN": user.token}
    }).then(res => {
        if(res.data.success) {
          console.log("유저 정보 가져오기 성공!");
          console.log(res)
          user.setUser(res.data.data);
        }

        else {
          user.clearUser();
          console.log("유저 정보 가져오기 실패!", res);
        }
      }).catch(err => {

        user.clearUser();
        console.log("유저 정보 가져오기 실패!", err);
    })
  },

  setUser: (getUser) => {
    user.isLogin = true;
    user.email = getUser.email;
    user.name = getUser.name;
    user.gender = getUser.gender;
    user.myPoint = getUser.myPoint;
    user.age = getUser.age;
  },

  logout: () => {
    setCookie("jwt", null);
    user.clearUser();
  },

  clearUser: () => {
    user.isLogin = false;
    user.token = null;
    user.email = null;
    user.name = null;
    user.gender = null;
    user.myPoint = 0;
    user.age = 0;
  }
};

const network = {
  baseURL: "/api/"
}

export default network;
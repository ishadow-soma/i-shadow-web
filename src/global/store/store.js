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
      url: http.baseURL + "users",
      headers: {"ACCESS-TOKEN": user.token}
    }).then(res => {
        if(res.data.success) {
          console.log("유저 정보 가져오기 성공!");
          console.log(res)
          user.setUser(
            res.data.data.email,
            res.data.data.name,
            res.data.data.gender,
            res.data.data.myPoint,
            res.data.data.age,
          );
        }

        else {
          console.log("유저 정보 가져오기 실패!");
          console.log(res)
        }
      }).catch(err => {

        console.log("유저 정보 가져오기 실패!");
        console.log(err);
    })
  },

  setUser: (email, name, gender, myPoint, age) => {
    user.isLogin = true;
    user.email = email;
    user.name = name;
    user.gender = gender;
    user.myPoint = myPoint;
    user.age = age;
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

export let currentVideo = {
  url: "null",
  code: null,
  title: "null",
  videoId: null
}

const http = {
  baseURL: "/api/"
  //baseURL: "https://ishadow.kr/api/"
}

export default http;
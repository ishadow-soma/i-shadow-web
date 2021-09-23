import { getCookie, setCookieDefaultOption } from "./cookie";
import axios from "axios";
import { createStore } from "@reduxjs/toolkit";

export let user = {
  token: null,
  email: null,
  name: null,
  gender: null,
  myPoint: 0,
  age: 0,

  get isLogin() {
    const token = getCookie("jwt");
    return token.length > 10;
  },

  // 로그인 확인 후 유저 정보 세팅
  verifyLogin: async () => {
    user.token = getCookie("jwt");
    if (user.token == null) return;

    await axios({
      method: "get",
      url: network.baseURL + "users",
      headers: { "ACCESS-TOKEN": user.token },
    })
      .then((res) => {
        if (res.data.success) {
          console.log("유저 정보 가져오기 성공!", res);
          user.setUser(res.data.data);
          userInfo.dispatch({ type: "LOGIN" });
          console.log(userInfo.getState());
        } else {
          user.clearUser();
          console.log("유저 정보 가져오기 실패!", res);
        }
      })
      .catch((err) => {
        user.clearUser();
        console.log("유저 정보 가져오기 실패!", err);
      });
  },

  setUser: (getUser) => {
    user.email = getUser.email;
    user.name = getUser.name;
    user.gender = getUser.gender;
    user.myPoint = getUser.myPoint;
    user.age = getUser.age;
  },

  logout: () => {
    setCookieDefaultOption("jwt", null);
    user.clearUser();
    userInfo.dispatch({ type: "LOGOUT" });
  },

  clearUser: () => {
    user.token = null;
    user.email = null;
    user.name = null;
    user.gender = null;
    user.myPoint = 0;
    user.age = 0;
  },
};

const network = {
  baseURL: "/api/",
};

function testUser(state = false, action) {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      return false;
    default:
      return false;
  }
}

export let userInfo = createStore(testUser);

export default network;

import { getCookie, setCookieDefaultOption } from "./cookie";
import axios from "axios";
import { createStore } from "@reduxjs/toolkit";
import logOnlyDevelopment from "../log/log";

export let user = {
  token: null,
  email: null,
  name: null,
  gender: null,
  myPoint: 0,
  age: 0,

  get isLogin() {
    const token = getCookie("jwt");
    if (token) return token.length > 10;
    else return false;
  },

  // 로그인 확인 후 유저 정보 세팅
  verifyLogin: async () => {
    logOnlyDevelopment("start verify login");
    user.token = getCookie("jwt");
    if (user.token == null) return;

    try {
      const res = await axios({
        method: "get",
        url: network.baseURL + "users",
        headers: { "ACCESS-TOKEN": user.token },
      });
      if (res.data.success) {
        logOnlyDevelopment("유저 정보 가져오기 성공!", res);
        user.setUser(res.data.data);
        userInfo.dispatch({ type: "LOGIN" });
        logOnlyDevelopment(userInfo.getState());
      } else {
        user.clearUser();
        logOnlyDevelopment("유저 정보 가져오기 실패!", res);
      }
      return true;
    } catch (err) {
      user.clearUser();
      logOnlyDevelopment("유저 정보 가져오기 실패!", err);
      return false;
    }
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

function globalRepeat(state = null, action) {
  switch (action.type) {
    case "PUSH":
      return action.id;
    default:
      return null;
  }
}

export let repeatStore = createStore(globalRepeat);

export default network;

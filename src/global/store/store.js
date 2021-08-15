export let user = {
  isLogin: false,
  token: null,
  email: null,
  name: null,
  gender: null,
  myPoint: 0,
  age: 0
};

const http = {
  baseURL: "/api/"
  //baseURL: "https://ishadow.kr/api/"
}

export default http;
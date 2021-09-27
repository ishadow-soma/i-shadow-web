import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const setCookieDefaultOption = (name, value) => {
  setCookie(name, value, {
    path: "/",
    secure: true,
    sameSite: "none",
    maxAge: 1209600,
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

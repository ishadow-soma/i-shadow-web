import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option })
}

export const setCookieDefault = (name, value) => {
  setCookie(name, value, {
    path: "/",
    secure: true,
    sameSite: "none"
  });
}

export const getCookie = (name) => {
  return cookies.get(name)
}
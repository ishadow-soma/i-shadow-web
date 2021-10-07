import axios from "axios";
import logOnlyDevelopment from "../log/log";

export default class Dictionary {
  async englishToKorean(word) {
    const formBody = new FormData();
    formBody.append("source", "en");
    formBody.append("target", "ko");
    formBody.append("text", word);
    logOnlyDevelopment(process.env.REACT_APP_PAPAGE_SECRET);
    return axios({
      method: "post",
      url: "https://openapi.naver.com/v1/papago/n2mt",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Naver-Client-Id": process.env.REACT_APP_PAPAGE_ID,
        "X-Naver-Client-Secret": process.env.REACT_APP_PAPAGE_SECRET,
      },
      data: formBody,
    });
  }
}

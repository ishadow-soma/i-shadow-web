import axios from "axios";
import network from "global/store/store";
import { getCookie } from "../store/cookie";
import logOnlyDevelopment from "../log/log";

export default class Bookmark {
  saveSentence(sentences) {
    axios({
      method: "post",
      url: network + "sentence",
      headers: getCookie("jwt"),
      data: {
        sentenceSaveType: "FAVORITE",
        sentences: sentences,
      },
      videoId: 0,
    })
      .then((res) => {
        logOnlyDevelopment(res);
        if (res.data.success)
          logOnlyDevelopment("즐겨찾기 목록에 저장되었습니다.");
        else alert("알 수 없는 이유로 저장에 실패했습니다.");
      })
      .catch((err) => logOnlyDevelopment(err));
  }

  getSentence(videoId) {
    axios({
      method: "get",
      url: network + "bookmark",
      headers: getCookie("jwt"),
      params: {
        videoId: videoId,
      },
    })
      .then((res) => {
        logOnlyDevelopment(res);
      })
      .catch((err) => logOnlyDevelopment(err));
  }
}

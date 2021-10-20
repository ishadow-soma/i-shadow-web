import axios from "axios";
import network from "global/store/store";
import { getCookie } from "global/store/cookie";
import logOnlyDevelopment from "global/log/log";

export default class Bookmark {
  saveSentence(sentenceIds) {
    axios({
      method: "post",
      url: network.baseURL + "shadowing-player/sentence",
      headers: getCookie("jwt"),
      data: {
        sentenceSaveType: "FAVORITE",
        sentences: sentenceIds,
      },
      videoId: getCookie("videoId"),
    })
      .then((res) => {
        logOnlyDevelopment(res);
        if (res.data.success)
          logOnlyDevelopment("즐겨찾기 목록에 저장되었습니다.", res);
        else alert("알 수 없는 이유로 저장에 실패했습니다.");
      })
      .catch((err) => logOnlyDevelopment(err));
  }

  getSentence(videoId) {
    axios({
      method: "get",
      url: network + "shadowing-player/bookmark",
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

import axios from "axios";
import network from "global/store/store";
import { getCookie } from "global/store/cookie";
import logOnlyDevelopment from "global/log/log";

export default class SentenceController {
  saveSentence(sentenceIds) {
    axios({
      method: "post",
      url: network.baseURL + "shadowing-player/sentence",
      headers: { "ACCESS-TOKEN": getCookie("jwt") },
      data: {
        sentenceSaveType: "FAVORITE",
        sentences: sentenceIds,
        videoId: getCookie("videoId"),
      },
    })
      .then((res) => {
        logOnlyDevelopment(res);
        if (res.data.success)
          logOnlyDevelopment("즐겨찾기 목록에 저장되었습니다.", res);
        else alert("알 수 없는 이유로 저장에 실패했습니다.");
      })
      .catch((err) => logOnlyDevelopment("에러", err));
  }

  async getSentence(videoId) {
    try {
      return await axios({
        method: "get",
        url: network.baseURL + "shadowing-player/bookmark",
        headers: { "ACCESS-TOKEN": getCookie("jwt") },
        params: {
          type: "FAVORITE",
          videoId: videoId,
        },
      });
    } catch (err) {
      logOnlyDevelopment("에러", err);
    }
  }
}

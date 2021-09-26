import axios from "axios";
import network from "global/store/store";
import { getCookie } from "../store/cookie";

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
        console.log(res);
        if (res.data.success) console.log("즐겨찾기 목록에 저장되었습니다.");
        else console.log("저장에 실패했습니다.");
      })
      .catch((err) => console.log(err));
  }

  getSentence() {}
}

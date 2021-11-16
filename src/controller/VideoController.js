import axios from "axios";
import network from "../global/store/store";
import { getCookie } from "../global/store/cookie";
import logOnlyDevelopment from "../global/log/log";

export default class VideoController {
  recommendPath = "media/recommend";

  async getRecommendedVideos() {
    try {
      const res = axios({
        method: "get",
        url: network.baseURL + this.recommendPath,
        headers: {
          "ACCESS-TOKEN": getCookie("jwt"),
          "Content-Type": "multipart/form-data",
        },
        param: {},
      });

      return res;
    } catch (err) {
      logOnlyDevelopment("영상 추천 목록 API", err);
    }
  }
}

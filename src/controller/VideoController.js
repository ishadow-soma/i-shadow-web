import axios from "axios";
import network from "../global/store/store";
import { getCookie } from "../global/store/cookie";
import logOnlyDevelopment from "../global/log/log";

export default class VideoController {
  recommendPath = "media/recommend";

  async getRecommendedVideos(categoryId = 20, level = 3) {
    try {
      return axios({
        method: "get",
        url: network.baseURL + this.recommendPath,
        headers: {
          "ACCESS-TOKEN": getCookie("jwt"),
          "Content-Type": "multipart/form-data",
        },
        param: {},
      });
    } catch (err) {
      logOnlyDevelopment("영상 추천 목록 API", err);
    }
  }
}

import axios from "axios";
import network from "../store/store";
import { getCookie } from "../store/cookie";
import logOnlyDevelopment from "../log/log";

export function getScript(sentences) {
  return sentences.map((sentence) => {
    return {
      sentence: sentence.content,
      begin: _getSecondsFromTime(sentence.startTime),
      end: _getSecondsFromTime(sentence.endTime),
    };
  });
}

export function _getSecondsFromTime(seconds) {
  return (
    parseInt(seconds.split(":")[0]) * 3600 +
    parseInt(seconds.split(":")[1]) * 60 +
    parseFloat(seconds.split(":")[2])
  );
}

export function getTitle(title) {
  if (title.length < 50) return title;
  else return title.slice(0, 50) + "...";
}

export async function requestVideoInfo() {
  logOnlyDevelopment("request video : ", getCookie("videoId"));
  const res = await axios({
    method: "get",
    url: network.baseURL + "shadowing-player",
    params: { videoId: getCookie("videoId") },
    headers: { "ACCESS-TOKEN": getCookie("jwt") },
  });
  return res.data;
}

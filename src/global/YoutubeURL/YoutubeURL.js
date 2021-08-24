import React from "react";
import './YoutubeURL.css'
import axios from "axios";
import http from "global/store/store";
import {currentVideo, user} from "global/store/store";
import {getCookie, setCookie} from "../store/cookie";

function YoutubeURL(props) {
  const onOkClick = () => {
    const inputUrl = document.getElementById("youtube-url").value;
    console.log("input url : " + inputUrl);

    axios({
      method: "post",
      url: http.baseURL + "media",
      params: {"category": "메롱",
        "type": "YOUTUBE",
        "youtubeURL": inputUrl},
      headers: {"ACCESS-TOKEN": getCookie("jwt")}
    })
      .then(res => {
        currentVideo.title = res.data.data.videoName;
        currentVideo.url = res.data.data.url;
        currentVideo.code = res.data.data.url.split("=")[1];
        currentVideo.videoId = res.data.data.videoId;
        console.log("code : " + currentVideo.code);
        console.log(res);
        console.log(currentVideo);
        setCookie('code', currentVideo.code, {
          path: "/",
          secure: true,
          sameSite: "none"
        })
        setCookie('videoId', currentVideo.videoId, {
          path: "/",
          secure: true,
          sameSite: "none"
        })
        window.location.href = "/youtube";
      })
  }

  return (
    <div style={{display: props.show ? "block" : "none"}} className="youtube-url">
      <div className="url-input">
        <input type="text" placeholder="ex) https://www.youtube.com/watch?v=1abcde23abs" id="youtube-url"/>
      </div>

      <div className="btn-container">
        <button type="submit" value="ok" className="ok" onClick={onOkClick}>확인</button>
        <button type="submit" value="cancel" className="cancel" onClick={props.cancelAction}>취소</button>
      </div>
    </div>
  );
}

export default YoutubeURL;
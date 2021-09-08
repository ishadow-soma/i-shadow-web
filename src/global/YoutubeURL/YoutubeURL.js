import React from "react";
import './YoutubeURL.css'
import axios from "axios";
import network from "global/store/store";
import {getCookie, setCookie} from "../store/cookie";

function YoutubeURL(props) {
  const onClickOk = () => {
    const inputUrl = document.getElementById("youtube-url").value;
    console.log("input url : " + inputUrl);
    const formBody = new FormData();
    formBody.append("type", "YOUTUBE");
    formBody.append("youtubeURL", inputUrl);
    formBody.append("categoryId", JSON.stringify([20]));

    axios({
      method: "post",
      url: network.baseURL + "media",
      data: formBody,
      headers: {
        "ACCESS-TOKEN": getCookie("jwt"),
        "Content-Type": "multipart/form-data"
      }
    })
      .then(res => {
        console.log(res);
        setCookie('videoId', res.data.data.videoId, {
          path: "/",
          secure: true,
          sameSite: "none"
        });
        window.location.href = "/youtube";
      }).catch(err => console.log("변환 실패!", err))

    props.setMode(props.type.LOADING);
  }

  return (
    <div className="youtube-url">
      <div className="url-input">
        <input type="text" placeholder="ex) https://www.youtube.com/watch?v=1abcde23abs" id="youtube-url"/>
      </div>

      <div className="btn-container">
        <button type="submit" value="ok" className="ok" onClick={onClickOk}>확인</button>
        <button type="submit" value="cancel" className="cancel" onClick={props.cancelAction}>취소</button>
      </div>
    </div>
  );
}

export default YoutubeURL;
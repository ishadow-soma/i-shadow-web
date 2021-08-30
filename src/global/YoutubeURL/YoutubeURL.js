import React from "react";
import './YoutubeURL.css'
import axios from "axios";
import http from "global/store/store";
import {user} from "global/store/store";
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
        console.log(res);
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
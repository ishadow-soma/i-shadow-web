import React from "react";
import './YoutubeURL.css'
import axios from "axios";
import http from "global/store/store";
import {currentVideo, user} from "global/store/store";

function YoutubeURL(props) {
  const onOkClick = () => {
    const inputUrl = document.getElementById("youtube-url").value;
    console.log(inputUrl);

    /*
    axios({
      method: "post",
      url: http.baseURL + "api/media",
      data: {""},
      headers: {"ACCESS-TOKEN": user.token}
    })*/
  }

  return (
    <div style={{display: props.show ? "block" : "none"}} className="youtube-url">
      <input type="text" placeholder="ex) https://www.youtube.com/watch?v=1abcde23abs" id="youtube-url"/>
    </div>
  );
}

export default YoutubeURL;
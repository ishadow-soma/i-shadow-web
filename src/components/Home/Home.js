import YoutubeURLDialog from "../../global/YoutubeURLDialog/YoutubeURLDialog";
import {Link, Route, Switch} from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";
import React from "react";

function Home() {
  return (
    <div className="home">
      <div className="menu-container">
        <div className="card" onClick={openDialog}>
          <h2>Youtube URL</h2>
          <p>유튜브 URL로 손쉽게 콘텐츠를 추가해 보세요.</p>
        </div>
        <div className="card">
          <h2>File Upload</h2>
          <p>영상 또는 음성 파일을 업로드해 손쉽게 콘텐츠를 추가해 보세요.</p>
          <input type="file" accept="audio/*, video/*"/>
        </div>
      </div>

      <YoutubeURLDialog/>
    </div>
  )
}

function openDialog() {
  let dialog = document.getElementById("inputURLDialog")
  if(typeof dialog.showModal === "function")
    dialog.showModal()
}

export default Home;
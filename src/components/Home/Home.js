import YoutubeURLDialog from "../../global/YoutubeURLDialog/YoutubeURLDialog";
import {Link, Route, Switch} from "react-router-dom";
import React from "react";
import './Home.css';

function Home() {
  return (
    <main>
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
      <Link to="/video">비디오 플레이어</Link>
      <Link to="/audio">오디오 플레이어</Link>
      <Link to="/youtube">유튜브 플레이어</Link>

      <YoutubeURLDialog/>
    </main>
  )
}

function openDialog() {
  let dialog = document.getElementById("inputURLDialog")
  if(typeof dialog.showModal === "function")
    dialog.showModal()
}

export default Home;
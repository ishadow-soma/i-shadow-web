import './App.css';
import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";
import Header from "../../global/Header/Header";
import YoutubeURLDialog from "../../global/YoutubeURLDialog/YoutubeURLDialog";

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <div className="wrap">
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

          <YoutubeURLDialog/>

          <div className="player-container">
            <Link to="/video">비디오 플레이어</Link>
            <Link to="/audio">오디오 플레이어</Link>
            <Link to="/youtube">유튜브 플레이어</Link>
            <Switch>
              <Route path="/video" component={VideoPlayer}/>
              <Route path="/audio" component={AudioPlayer}/>
              <Route path="/youtube" component={YoutubePlayer}/>
              <Route path="/youtube/:url" component={YoutubePlayer}/>
            </Switch>
          </div>
        </main>
      </div>


    </BrowserRouter>
  );
}

function openDialog() {
  let dialog = document.getElementById("inputURLDialog")
  if(typeof dialog.showModal === "function")
    dialog.showModal()
}

export default App;

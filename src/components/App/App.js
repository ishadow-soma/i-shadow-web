import './App.css';
import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";
import Header from "../../global/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <main>
        <input type="file" accept="audio/*, video/*"/>
        <button onClick={openDialog}>Youtube URL</button>
        {/* input youtube url */}
        <dialog id={"inputURLDialog"}>
          <form name="youtube-form" method="get" action="">
            <p>dialog</p>
            <input placeholder="Youtube URL" name="url"/>

            <Link to="/youtube">제출</Link>
            <button value="cancel">취소</button>
          </form>
        </dialog>

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
    </BrowserRouter>
  );
}

function openDialog() {
  let dialog = document.getElementById("inputURLDialog")
  if(typeof dialog.showModal === "function")
    dialog.showModal()
}

export default App;

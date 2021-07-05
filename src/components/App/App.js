import './App.css';
import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>I-Shadow</h1>
      </header>

      <main>
        <input type="file" accept="audio/*, video/*"/>
        <button onClick={openDialog}>Youtube URL</button>
        <button onClick={codeInYoutubeURL}>temp</button>
        <dialog id={"inputURLDialog"}>
          <form action="">
            <p>dialog</p>
            <input placeholder="Youtube URL"/>

            <button type="submit">제출</button>
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

function codeInYoutubeURL(url) {
  const testURL = 'https://www.youtube.com/watch?v=ozlRWpLnMSk&list=LL&index=25';

  let youtubeURL = url.toString();
  let idx = youtubeURL.indexOf("?");
  let result = youtubeURL.substr(idx + 3, 11);
  console.log(result);

  return result;
}

export default App;

import './App.css';
import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";
import Header from "../../global/Header/Header";
import YoutubeURLDialog from "../../global/YoutubeURLDialog/YoutubeURLDialog";
import Home from "../Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <div className="wrap">
        <main>
          <div className="player-container">
            <Link to="/video">비디오 플레이어</Link>
            <Link to="/audio">오디오 플레이어</Link>
            <Link to="/youtube">유튜브 플레이어</Link>
            <Switch>
              <Route exact path="/" component={Home}/>
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

export default App;

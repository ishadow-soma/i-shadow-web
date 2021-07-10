import './App.css';
import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";
import Header from "../../global/Header/Header";
import YoutubeURLDialog from "../../global/YoutubeURLDialog/YoutubeURLDialog";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header/>

      <div className="wrap">
        <div className="player-container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>

            <Route path="/video" component={VideoPlayer}/>
            <Route path="/audio" component={AudioPlayer}/>
            <Route path="/youtube" component={YoutubePlayer}/>
            <Route path="/youtube/:url" component={YoutubePlayer}/>
          </Switch>
        </div>
      </div>


    </BrowserRouter>
  );
}

export default App;

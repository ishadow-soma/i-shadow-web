import './App.css';
import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";
import Header from "../../global/Header/Header";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import MyRoom from "../MyRoom/MyRoom";
import Payment from "../Payment/Payment";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import FindPassword from "../FindPassword/FindPassword";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header/>
      <div className="wrap">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/myroom" component={MyRoom}/>
          <Route path="/payment" component={Payment}/>
          <Route path="/paymentmethod" component={PaymentMethod}/>
          <Route path="/findpassword" component={FindPassword}/>

          <Route path="/video" component={VideoPlayer}/>
          <Route path="/audio" component={AudioPlayer}/>
          <Route path="/youtube" component={YoutubePlayer}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

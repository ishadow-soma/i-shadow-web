import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import VideoPlayer from "components/VideoPlayer/VideoPlayer";
import AudioPlayer from "components/AudioPlayer/AudioPlayer";
import YoutubePlayer from "components/YoutubePlayer/YoutubePlayer";
import Home from "components/Home/Home";
import Login from "components/Login/Login";
import Signup from "components/Signup/Signup";
import MyRoom from "components/MyRoom/MyRoom";
import Payment from "components/Payment/Payment";
import PaymentMethod from "components/PaymentMethod/PaymentMethod";
import FindPassword from "components/FindPassword/FindPassword";
import EditProfile from "components/EditProfile/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/myroom" component={MyRoom} />
        <Route path="/payment" component={Payment} />
        <Route path="/paymentmethod" component={PaymentMethod} />
        <Route path="/findpassword" component={FindPassword} />
        <Route path="/video" component={VideoPlayer} />
        <Route path="/audio" component={AudioPlayer} />
        <Route path="/youtube" component={YoutubePlayer} />
        <Route path="/editprofile" component={EditProfile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

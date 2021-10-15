import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import VideoPlayer from "components/feature/VideoPlayer/VideoPlayer";
import AudioPlayer from "components/feature/AudioPlayer/AudioPlayer";
import YoutubePlayer from "components/feature/YoutubePlayer/YoutubePlayer";
import Home from "components/feature/Home/Home";
import Login from "components/feature/Login/Login";
import Signup from "components/feature/Signup/Signup";
import MyRoom from "components/feature/MyRoom/MyRoom";
import Payment from "components/feature/Payment/Payment";
import PaymentMethod from "components/feature/PaymentMethod/PaymentMethod";
import FindPassword from "components/feature/FindPassword/FindPassword";
import EditProfile from "components/feature/EditProfile/EditProfile";
import NotFound from "components/feature/NotFound/NotFound";
import ChatBot from "components/feature/ChatBot/ChatBot";
import Contents from "components/feature/Contents/Contents";

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
        <Route path="/chatbot" component={ChatBot} />
        <Route path="/contents" component={Contents} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

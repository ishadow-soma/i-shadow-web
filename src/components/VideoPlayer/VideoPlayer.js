import React from "react";
import Header from "../../global/Header/Header";
import Footer from "../../global/Footer/Footer";
import "../CustomPlayer.css";

function VideoPlayer() {
  return (
    <div className="wrap">
      <Header/>
      <div className="container">
        <div className="audio-player custom-player">
          <div className="audio-frame">
            <h2><i className="xi-videocam"/> 내가 변환한 영상 콘텐츠</h2>
            <h1>The Intern - Official Trailer [HD]</h1>
            <span className="audio-background">
                <span className="operation-menu">
                  <i className="xi-step-backward"/>
                  <i className="xi-pause pause"/>
                  <i className="xi-step-forward"/>
                </span>
                <span className="volume">
                  <i className="xi-volume-up"/>
                </span>
              </span>
            <div className="caption">
              Our hearts wore never broken
            </div>
            <Footer/>
          </div>

          <div className="script">
            <button className="tab selected"><i className="xi-file-text-o tab-icon"/>Script</button>
            <button className="tab"><i className="xi-microphone tab-icon"/> Rec.</button>

            <div className="content">
              <ul>
                <li>
                  <button className="time-stamp">0:59</button>
                  <p>Loving can hurt</p>
                </li>
                <li>
                  <button className="time-stamp">1:23</button>
                  <p>loving can hurt sometimes</p>
                </li>
                <li>
                  <button className="time-stamp">1:56</button>
                  <p>But it's the only thing that I know</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
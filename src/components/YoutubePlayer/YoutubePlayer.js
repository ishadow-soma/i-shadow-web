import './YoutubePlayer.css';
import React, {useEffect, useState} from "react";
import Footer from "../../global/Footer/Footer";

const youtubeCode = ['1eAZvWm0gE0', 'd-HK6DFi3MA'];
const YTPlayer = require('yt-player');

function YoutubePlayer({match}) {
  var player, seconds = 0;

  useEffect(() => {
    player = new YTPlayer('#player', {width: 920, height: 516});
    console.log('player');

    player.load(youtubeCode[1]);

    player.on('playing', () => {
      console.log(player.getDuration())
    })
  })

  const onSeek = (seconds = 40) => {
    console.log('button clicked!');
    player.seek(seconds);
  };

  return (
    <div className="container">
      <div className="youtube-player">
        <div className="video-frame">
          <h2><i className="xi-youtube-play xi-x"/> 내가 변환한 유튜브 콘텐츠</h2>
          <h1>The Intern - Official Trailer [HD]</h1>
          <element id="player"/>
          <div className="caption">
            Our hearts wore never broken
          </div>
          <a href=""><i className="xi-link"/> https://www.youtube.com/watch?v=1abcde23abs</a>
          <Footer/>
        </div>

        <div className="script">
          <button className="tab selected"><i className="xi-microphone"/>Script</button>
          <button className="tab"><i className="xi-microphone xi-x"/> Rec.</button>

          <div className="content">
            <ul>
              <li>
                <button onClick={() => onSeek(59)} className="time-stamp">0:59</button>
                <p>Loving can hurt</p>
              </li>
              <li>
                <button onClick={() => onSeek(60+23)} className="time-stamp">1:23</button>
                <p>loving can hurt sometimes</p>
              </li>
              <li>
                <button onClick={() => onSeek(60+56)} className="time-stamp">1:56</button>
                <p>But it's the only thing that I know</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubePlayer;
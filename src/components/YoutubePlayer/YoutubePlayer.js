import './YoutubePlayer.css';
import React, {useEffect, useState} from "react";
import Footer from "global/Footer/Footer";
import Header from "global/Header/Header";

const youtubeCode = ['1eAZvWm0gE0', 'd-HK6DFi3MA'];
const YTPlayer = require('yt-player');

function YoutubePlayer() {
  var player, seconds = 0;
  let repetition;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    player = new YTPlayer('#player', {width: 920, height: 516});
    console.log('player');

    player.load(youtubeCode[0]);

    player.on('playing', () => {
      console.log(player.getDuration())
    })
  })

  const startRepeat = (begin, end) => {
    const len = (end - begin) * 1000;

    player.seek(begin);

    repetition = setInterval(() => {
      player.seek(begin);
    }, len);
  }

  const endRepetition = () => {
    clearInterval(repetition);
  }

  const onSeek = (seconds = 40) => {
    console.log('button clicked!');
    player.seek(seconds);
  };

  return (
    <div className="wrap">
      <Header/>
      <div className="youtube-background">
        <div className="container">
          <div className="youtube-player">
            <div className="video-frame">
              <h2><i className="xi-youtube-play xi-x"/> 내가 변환한 유튜브 콘텐츠</h2>
              <h1>The Intern - Official Trailer [HD]</h1>
              <element id="player"/>
              <div className="caption">
                Our hearts wore never broken
              </div>
              <a href={"https://www.youtube.com/"}><i className="xi-link"/> https://www.youtube.com/watch?v=1abcde23abs</a>
              <Footer/>
            </div>

            <div className="script">
              <button className="tab selected"><i className="xi-file-text-o"/>Script</button>
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
                  <li>
                    <button onClick={() => startRepeat(120, 124)} className="time-stamp">2:00</button>
                    <p>반복 2:00 ~ 2:04</p>
                  </li>
                  <li>
                    <button onClick={() => endRepetition()} className="time-stamp">2:00</button>
                    <p>반복 끝내기</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubePlayer;
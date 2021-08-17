import './YoutubePlayer.css';
import React, {useEffect, useState} from "react";
import Footer from "global/Footer/Footer";
import Header from "global/Header/Header";
import axios from "axios";
import http, {user} from "global/store/store";

//const youtubeCode = ['1eAZvWm0gE0', 'd-HK6DFi3MA'];
const YTPlayer = require('yt-player');

function YoutubePlayer() {
  let player, seconds = 0;
  let repetition;
  let script;
  let videoCode;

  useEffect(() => {
    requestVideo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    player = new YTPlayer('#player', {width: 920, height: 516});
    console.log('player');

    player.load("ULK4BuPWgHY");

    player.on('playing', () => {
      console.log(player.getDuration())
    })
  })

  // 스크립트 렌더링
  const setScript = () => {
    const insertion = document.getElementById("script");
    script.forEach(it => {
      // li 태그에 button, p 를 넣음.
      const li = document.createElement('li');
      const button = document.createElement('button');
      const p = document.createElement('p');

      button.innerText = `${parseInt(it.begin / 60)}:${it.begin % 60}`;
      button.className = "time-stamp";
      button.onclick = () => onSeek(it.begin);

      p.innerText = it.sentence;

      li.append(button);
      li.append(p);
      insertion.append(li);

      return li;
    })
  }

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

  // 영상 불러오기

  const requestVideo = () => {
    axios({
      method: "get",
      url: http.baseURL + "shadowing-player" + "?videoId=2",
      data: {},
      headers: {"ACCESS-TOKEN": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjQsImlhdCI6MTYyOTIxOTY4OCwiZXhwIjoxNjMwNDI5Mjg4fQ.R4ytQdxr-2wyfS7ojLbne5oN-xF126d1-8YcuAus9Eo"}
    })
      .then(res => {
        console.log(res);
        videoCode = res.data.data.videoURL.split("/")[3];
        console.log(videoCode);
        script = res.data.data.sentences.map(it => {
          return {
            sentence: it.content,
            begin: parseInt(it.startTime.split(":")[0]) * 3600 + parseInt(it.startTime.split(":")[1]) * 60 + parseInt(it.startTime.split(":")[2]),
            end: 0
          }
        })
        setScript();
      })
  }

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
                <ul id="script">
                  <li>
                    <button onClick={() => startRepeat(30, 34)} className="time-stamp">0:30</button>
                    <p>반복 0:30 ~ 0:34</p>
                  </li>
                  <li>
                    <button onClick={() => endRepetition()} className="time-stamp">0:30</button>
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
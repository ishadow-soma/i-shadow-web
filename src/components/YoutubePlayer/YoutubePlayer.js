import './YoutubePlayer.css';
import React, {useEffect, useState} from "react";
import Footer from "global/Footer/Footer";
import Header from "global/Header/Header";
import axios from "axios";
import http, {user, currentVideo} from "global/store/store";
import {getCookie} from "global/store/cookie";

const YTPlayer = require('yt-player');

function YoutubePlayer() {
  let player;
  let repetition;
  let script;
  let videoCode;

  useEffect(() => {
    requestVideo();

    console.log("currentVideo");
    console.log(currentVideo);
    console.log("jwt cookie : " + getCookie("jwt"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    player = new YTPlayer('#player', {width: 920, height: 516});
    console.log('player');

    player.load(getCookie("code"));

    player.on('playing', () => {
      console.log(player.getDuration())
      //setCurrentSentence(); 자막 컨트롤
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
      const i = document.createElement('i');

      button.innerText = `${parseInt(it.begin / 60)}:${it.begin % 60}`;
      button.className = "time-stamp";
      button.onclick = () => onSeek(it.begin);

      p.innerText = it.sentence;

      i.className = "xi-repeat repetition";

      i.onClick = () => startRepeat(it.begin, it.end);
      console.log("it : ", it.begin, it.end);

      li.append(button);
      li.append(p);
      li.append(i);
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
    player.seek(seconds);
  };

  // 영상 불러오기

  const requestVideo = () => {
    console.log("request video : ", getCookie("videoId"))
    axios({
      method: "get",
      url: http.baseURL + "shadowing-player",
      params: {"videoId": getCookie("videoId")},
      headers: {"ACCESS-TOKEN": getCookie("jwt")}
    })
      .then(res => {
        console.log(res);
        videoCode = res.data.data.videoURL.split("/")[3];
        script = res.data.data.sentences.map(it => {
          return {
            sentence: it.content,
            begin: parseInt(it.startTime.split(":")[0]) * 3600 + parseInt(it.startTime.split(":")[1]) * 60 + parseInt(it.startTime.split(":")[2]),
            end: parseInt(it.endTime.split(":")[0]) * 3600 + parseInt(it.endTime.split(":")[1]) * 60 + parseInt(it.endTime.split(":")[2])
          }
        });
        setScript();
      })
  }

  // 현재 스크립트 하이라이팅
  /*
  const setCurrentSentence = () => {
    let curSecond = player.getCurrentTime();
    for(let i = 0; i < script.length; ++i) {
      if(script[`${i}`].begin <= curSecond && curSecond <= script[`${i}`].end) {
        document.getElementById("caption").innerText = script[`${i}`].sentence;
        break;
      }
    }
  }*/

  return (
    <div className="wrap">
      <Header/>
      <div className="youtube-background">
        <div className="container">
          <div className="youtube-player">
            <div className="video-frame">
              <h2><i className="xi-youtube-play xi-x"/> 내가 변환한 유튜브 콘텐츠</h2>
              <h1>{currentVideo.title}</h1>
              <element id="player"/>
              <div className="caption" id="caption">
                Our hearts wore never broken
              </div>
              <a href={currentVideo.url}><i className="xi-link"/> {currentVideo.url}</a>
              <Footer/>
            </div>

            <div className="script">
              <button className="tab selected"><i className="xi-file-text-o"/>Script</button>
              <button className="tab"><i className="xi-microphone xi-x"/> Rec.</button>

              <div className="content">
                <ul id="script">
                  <li draggable="true">
                    <button onClick={() => onSeek(19)} className="time-stamp">0:19</button>
                    <p draggable="false">더미 텍스트 입니다 ^^</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(0, 3)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(24)} className="time-stamp">0:24</button>
                    <p draggable="false">더미 텍스트 입니다 ^^</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(24, 27)}/>
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
import './YoutubePlayer.css';
import React, {useEffect, useState} from "react";
import Footer from "global/Footer/Footer";
import Header from "global/Header/Header";
import axios from "axios";
import http, {user} from "global/store/store";
import {getCookie} from "global/store/cookie";
import DragSelect from "dragselect";
import { Scrollbar } from "react-scrollbars-custom";

const YTPlayer = require('yt-player');

function YoutubePlayer() {
  const [title, setTitle] = useState("제목");
  const [url, setUrl] = useState("null");
  let player;
  let repetition = null;
  let script;
  let videoCode;

  useEffect(() => {
    requestVideo();
  }, []);

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
        videoCode = res.data.data.videoURL.split("=")[1];
        console.log(`video code : ${videoCode}`);
        script = res.data.data.sentences.map(it => {
          return {
            sentence: it.content,
            begin: parseInt(it.startTime.split(":")[0]) * 3600 + parseInt(it.startTime.split(":")[1]) * 60 + parseFloat(it.startTime.split(":")[2]),
            end: parseInt(it.endTime.split(":")[0]) * 3600 + parseInt(it.endTime.split(":")[1]) * 60 + parseFloat(it.endTime.split(":")[2])
          }
        });
        setVideo(videoCode);
        setUrl(`https://youtu.be/${videoCode}`);
        setScript();
      })
  }

  const setVideo = (videoCode) => {
    player = new YTPlayer('#player', {width: 840, height: 480});
    console.log('player');

    player.load(videoCode);

    player.on('playing', () => {
      console.log(player.getDuration())
      //setCurrentSentence(); 자막 컨트롤
    })

    player.on('timeupdate', (seconds) => {
      setCurrentSentence();
    })
  }

  // 스크립트 렌더링
  const setScript = () => {
    console.log("set script called!!");
    const insertion = document.getElementById("script");
    script.forEach(it => {
      // li 태그에 button, p 를 넣음.

      const li = document.createElement('li');
      const button = document.createElement('button');
      const p = document.createElement('p');
      const repetitionIcon = document.createElement('i');

      button.innerText = `${parseInt(it.begin / 60)}:${parseInt(it.begin % 60)}`;
      button.className = "time-stamp";
      button.onclick = () => onSeek(it.begin);

      p.innerText = it.sentence;
      repetitionIcon.className = "repetition xi-repeat";
      repetitionIcon.onclick = () => {startRepeat(it.begin, parseFloat(it.end) + 1)};
      console.log(it.begin + ":" + it.end + " : " + (parseFloat(it.end) + 1));

      li.className = "item";
      li.append(button);
      li.append(p);
      li.append(repetitionIcon);

      insertion.append(li);

      new DragSelect({
        selectables: document.querySelectorAll('.item'),
        callback: e => {
          console.log(e);
          if(e.length !== 0);
            console.log(e[e.length - 1]);
        }
      })
    })
    console.log("set script end!");
  }

  const startRepeat = (begin, end) => {
    if(repetition !== null)
      clearInterval(repetition);

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

  // 현재 스크립트 -> 자막
  const setCurrentSentence = () => {
    let curSecond = player.getCurrentTime();
    for(let i = 0; i < script.length; ++i) {
      if(script[`${i}`].begin <= curSecond && curSecond <= script[`${i}`].end) {
        const targetTag = document.getElementById("caption");
        if(targetTag != null)
          targetTag.innerText = script[`${i}`].sentence;
        break;
      }
    }
  }

  return (
    <div className="wrap">
      <Header/>
      <div className="youtube-background">
        <div className="container">
          <div className="youtube-player">
            <div className="video-frame">
              <h2><i className="xi-youtube-play xi-x"/> 내가 변환한 유튜브 콘텐츠</h2>
              <h1>{title}</h1>
              <element id="player"/>
              <div className="caption" id="caption">
                Our hearts wore never broken
              </div>
              <a href={url}><i className="xi-link"/> {url}</a>
              <Footer/>
            </div>

            <div className="script">
              <button className="tab selected"><i className="xi-file-text-o"/>Script</button>
              <button className="tab"><i className="xi-microphone xi-x"/> Rec.</button>

              <div className="content">
                <Scrollbar style={{ width: 400, height: document.documentElement.clientHeight * 0.74}}>
                  <ul id="script">
                    <li className="item">
                      <button className="time-stamp">1:23</button>
                      <p>더미 텍스트 ^^</p>
                      <i className="xi-repeat repetition"/>
                    </li>
                    {/* 이곳에 스크립트 렌더링  */}
                  </ul>
                </Scrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubePlayer;
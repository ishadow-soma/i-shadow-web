import './YoutubePlayer.css';
import React, {useEffect, useState} from "react";
import Footer from "global/Footer/Footer";
import Header from "global/Header/Header";
import axios from "axios";
import network, {user} from "global/store/store";
import {getCookie} from "global/store/cookie";
import DragSelect from "dragselect";
import { Scrollbar } from "react-scrollbars-custom";

const YTPlayer = require('yt-player');

function YoutubePlayer() {
  const [title, setTitle] = useState("제목");
  const [url, setUrl] = useState("null");
  const [contentType, setContentType] = useState(0); // 0 : 플레이어, 1 : 녹음
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
      url: network.baseURL + "shadowing-player",
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
    player = new YTPlayer('#player', {width: 800, height: 456});
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
      const timeStamp = createTimeStamp(it);
      const p = document.createElement('p');
      const repetitionIcon = createRepetitionIcon(it);

      p.innerText = it.sentence;
      console.log(it.begin + ":" + it.end + " : " + (parseFloat(it.end) + 1));

      li.className = "item";
      li.append(timeStamp);
      li.append(p);
      li.append(repetitionIcon);

      insertion.append(li);

      setDragSelect();
    })
    console.log("set script end!");
  }

  const createTimeStamp = (sentence) => {
    const resultElement = document.createElement('button');
    resultElement.innerText = `${parseInt(sentence.begin / 60)}:${parseInt(sentence.begin % 60)}`;
    resultElement.className = "time-stamp";
    resultElement.onclick = () => onSeek(sentence.begin);
    return resultElement;
  }

  const createRepetitionIcon = (sentence) => {
    const resultElement = document.createElement('i');
    resultElement.className = "repetition xi-repeat";
    resultElement.onclick = () => {startRepeat(sentence.begin, parseFloat(sentence.end) + 1)};
    return resultElement;
  }

  const setDragSelect = () => {
    new DragSelect({
      selectables: document.querySelectorAll('.item'),
      callback: e => {
        console.log(e);
      }
    });
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

  const selectTab = (type) => {
    setContentType(type);
    document.getElementsByClassName("tab")[type].classList.add("selected");
    document.getElementsByClassName("tab")[(type + 1) % 2].classList.remove("selected");
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
              <button className="tab selected" onClick={ () => { selectTab(0) } }><i className="xi-file-text-o"/>Script</button>
              <button className="tab" onClick={ () => { selectTab(1)} }><i className="xi-microphone xi-x"/> Rec.</button>

              <div className="content">
                <Scrollbar style={{ width: 400, height: 640}}>
                  <ul id="script" style={{display: contentType === 0 ? "block" : "none"}}>
                    <li className="item">
                      <button className="time-stamp">1:23</button>
                      <p>더미 텍스트 ^^</p>
                      <i className="xi-repeat repetition"/>
                    </li>
                    {/* 이곳에 스크립트 렌더링  */}
                  </ul>

                  <ul className="recoded-list" style={{display: contentType === 1 ? "block" : "none"}}>
                    <li>
                      <i className="xi-microphone icon"/>
                      <h3>녹음된 목록 3</h3>
                      <p className="time-line">00:08 - 00:42</p>
                      <p className="datetime">2021.07.29. 13:41</p>
                    </li>
                    <li>
                      <i className="xi-microphone icon"/>
                      <h3>녹음된 목록 2</h3>
                      <p className="time-line">00:08 - 00:42</p>
                      <p>2021.07.28. 13:41</p>
                    </li>
                    <li>
                      <i className="xi-microphone icon"/>
                      <h3>녹음된 목록 1</h3>
                      <p className="time-line">00:08 - 00:42</p>
                      <p>2021.07.27. 13:41</p>
                    </li>
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
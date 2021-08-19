import './YoutubePlayer.css';
import React, {useEffect, useState} from "react";
import Footer from "global/Footer/Footer";
import Header from "global/Header/Header";
import axios from "axios";
import http, {user} from "global/store/store";

//const youtubeCode = ['1eAZvWm0gE0', 'd-HK6DFi3MA'];
const YTPlayer = require('yt-player');

function YoutubePlayer() {
  let player;
  let repetition;
  let script = [
      {
        "sentence": "I'm in my bad",
        "begin": 19,
        "end": 24
      },
    {
      "sentence": "And you're not here",
      "begin": 24,
      "end": 29
    },
    {
      "sentence": "And there's no one to blame but the drink and my wandering hands",
      "begin": 29,
      "end": 37
    },
    {
      "sentence": "Forget what I said",
      "begin": 37,
      "end": 41
    },
    {
      "sentence": "It's not what I meant",
      "begin": 41,
      "end": 46
    },
    {
      "sentence": "And I can't take it back, I can't unpack the baggage you left",
      "begin": 46,
      "end": 55
    },
    {
      "sentence": "What am I now?",
      "begin": 55,
      "end": 56.5
    },
    {
      "sentence": "What am I now?",
      "begin": 56.5,
      "end": 59
    },
    {
      "sentence": "What if I'm someone I don't want around?",
      "begin": 59,
      "end": 64
    },
    {
      "sentence": "I'm falling again, I'm falling again, I'm falling",
      "begin": 64,
      "end": 70
    }
    ];
  let videoCode;

  useEffect(() => {
    //requestVideo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    player = new YTPlayer('#player', {width: 920, height: 516});
    console.log('player');

    player.load("olGSAVOkkTI");

    player.on('playing', () => {
      console.log(player.getDuration())
      setCurrentSentence();
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
    axios({
      method: "get",
      url: http.baseURL + "shadowing-player" + "?videoId=5",
      data: {},
      headers: {"ACCESS-TOKEN": ""}
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

  const setCurrentSentence = () => {
    let curSecond = player.getCurrentTime();
    for(let i = 0; i < script.length; ++i) {
      if(script[`${i}`].begin <= curSecond && curSecond <= script[`${i}`].end) {
        document.getElementById("caption").innerText = script[`${i}`].sentence;
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
              <h1>Harry Styles - Falling (Official Video)</h1>
              <element id="player"/>
              <div className="caption" id="caption">
                Our hearts wore never broken
              </div>
              <a href={"https://www.youtube.com/"}><i className="xi-link"/> https://youtu.be/olGSAVOkkTI</a>
              <Footer/>
            </div>

            <div className="script">
              <button className="tab selected"><i className="xi-file-text-o"/>Script</button>
              <button className="tab"><i className="xi-microphone xi-x"/> Rec.</button>

              <div className="content">
                <ul id="script">
                  <li draggable="true">
                    <button onClick={() => onSeek(19)} className="time-stamp">0:19</button>
                    <p draggable="false">I'm in my bad</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(0, 3)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(24)} className="time-stamp">0:24</button>
                    <p draggable="false">And you're not here</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(24, 27)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(29)} className="time-stamp">0:29</button>
                    <p draggable="false">And there's no one to blame but the drink and my wandering hands</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(6, 10)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(37)} className="time-stamp">0:37</button>
                    <p draggable="false">Forget what I said</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(10, 15)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(41)} className="time-stamp">0:41</button>
                    <p draggable="false">It's not what I meant</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(46)} className="time-stamp">0:46</button>
                    <p draggable="false">And I can't take it back, I can't unpack the baggage you left</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(55)} className="time-stamp">0:55</button>
                    <p draggable="false">What am I now?</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(56)} className="time-stamp">0:56</button>
                    <p draggable="false">What am I now?</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(59)} className="time-stamp">0:59</button>
                    <p draggable="false">What if I'm someone I don't want around?</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(64)} className="time-stamp">1:04</button>
                    <p draggable="false">I'm falling again, I'm falling again, I'm falling</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(73)} className="time-stamp">1:13</button>
                    <p draggable="false">What if I'm down?</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(75)} className="time-stamp">1:15</button>
                    <p draggable="false">What if I'm down?</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(77)} className="time-stamp">1:17</button>
                    <p draggable="false">What if I'm someone you won't talk about?</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(82)} className="time-stamp">1:22</button>
                    <p draggable="false">I'm falling again, I'm falling again, I'm falling</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(90)} className="time-stamp">1:30</button>
                    <p draggable="false">You said you care, and you missed me too</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
                  </li>
                  <li draggable="true">
                    <button onClick={() => onSeek(94)} className="time-stamp">1:34</button>
                    <p draggable="false">And I'm well aware I write too many songs about you</p>
                    <i className="xi-repeat repetition" onClick={() => startRepeat(15, 60)}/>
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
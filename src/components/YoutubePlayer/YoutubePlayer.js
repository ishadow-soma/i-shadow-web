import './YoutubePlayer.css';
import React, {createElement, useEffect, useState} from "react";
import Footer from "global/Footer/Footer";
import Header from "global/Header/Header";
import axios from "axios";
import network from "global/store/store";
import {getCookie} from "global/store/cookie";
import DragSelect from "dragselect";
import { Scrollbar } from "react-scrollbars-custom";
import ScriptPutter from "./ScriptPutter";

const YTPlayer = require('yt-player');

function YoutubePlayer() {
  const [title, setTitle] = useState("제목");
  const [url, setUrl] = useState("null");
  const [contentType, setContentType] = useState(0); // 0 : 플레이어, 1 : 녹음
  let player;
  let repetition = null;
  let script;
  let videoCode;
  let ds;

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
        setTitle(res.data.data.videoName);
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
    })

    player.on('timeupdate', (seconds) => {
      setCurrentSentence();
    })
  }

  const setScript = () => {
    //const insertHere = document.getElementById("script");
    //script.forEach((sentence, index) => insertHere.append(ScriptPutter(player, sentence, index)));
    ScriptPutter(player, script);
    setDragSelect();
  }

  let preIcon = null;
  const setDragSelect = () => {
    ds = new DragSelect({
      selectables: document.querySelectorAll('.item'),
      draggability: false,
      callback: e => {
        // 새 버튼 생성
        const selectedElements = document.getElementsByClassName("ds-selected");
        if(selectedElements.length > 0) {
          const repetitionIcon = createRepetitionIcon(getRepeatSection(selectedElements));
          selectedElements[selectedElements.length - 1].append(repetitionIcon);
        }

        // 이전 버튼 삭제, 버튼 클릭시 드래그 셀렉트도 발생하므로 딜레이 주고 삭제
        const repetitionIcons = document.getElementsByClassName("repetition");
        if(preIcon !== null && repetitionIcons.length > 1) {
          setTimeout(() => {
            preIcon.remove()
            preIcon = repetitionIcons[0];
            console.log("remove")
          }, 100);
        }
        else preIcon = repetitionIcons[0];
      }
    });
  }

  const createRepetitionIcon = (section) => {
    const result = document.createElement('i');
    result.className = "repetition xi-repeat";
    result.onclick = () => {startRepeat(section.begin, section.end + 1)};
    return result;
  }

  let originBegin;
  let originEnd;
  let setTime;
  const getRepeatSection = (selectedElements) => {
    const beginIndex = parseInt(selectedElements[0].id.slice(3));
    const endIndex = parseInt(selectedElements[selectedElements.length - 1].id.slice(3));
    setTime = setTimeout(()=> {
      originBegin = beginIndex;
      originEnd = endIndex;
    }, 100);
    const begin = getBegin(beginIndex);
    const end = getEnd(endIndex);
    return {
      begin: begin,
      end: end
    }
  }

  const getBegin = (idx) => {
    return script[idx].begin;
  }

  const getEnd = (idx) => {
    return script[idx].end;
  }

  const startRepeat = (begin, end) => {
    // TODO : 그냥 기존 아이콘 지우고 새로 만들자
    clearTimeout(setTime);
    for(let i = originBegin; i <= originEnd; ++i) {
      ds.addSelection(document.getElementsByClassName("item")[i], false, false);
    }

    if(repetition !== null)
      endRepetition();

    const len = (end - begin) * 1000;

    player.seek(begin);

    repetition = setInterval(() => {
      player.seek(begin);
    }, len);
  }

  const endRepetition = () => {
    clearInterval(repetition);
  }

  // 현재 스크립트 -> 자막
  const setCurrentSentence = () => {
    let curSecond = player.getCurrentTime();
    for(let i = 0; i < script.length; ++i) {
      if(script[`${i}`].begin <= curSecond && curSecond <= script[`${i}`].end) {
        const targetTag = document.getElementById("caption");
        if(targetTag != null) targetTag.innerText = script[`${i}`].sentence;
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
              <div id="player"/>
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
                    <li className="">
                      <button className="time-stamp">1:23</button>
                      <p>더미 텍스트 ^^</p>
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
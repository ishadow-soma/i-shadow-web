import "./YoutubePlayer.css";
import React, { useEffect, useState } from "react";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import axios from "axios";
import network from "global/store/store";
import { getCookie } from "global/store/cookie";
import { Scrollbar } from "react-scrollbars-custom";
import setScript from "./setScript";
import setDragSelect from "./setDragSelect";
import EvaluationModal from "./EvaluationModal";
import Modal from "react-modal";
import Record from "global/record/Record";

const YTPlayer = require("yt-player");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "15px",
  },
};

function YoutubePlayer() {
  const [title, setTitle] = useState("제목");
  const [url, setUrl] = useState("null");
  const [contentType, setContentType] = useState(0); // 0 : 플레이어, 1 : 녹음
  let player;
  let script;
  let videoCode;
  let shouldVideoEvaluation;
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    requestVideo();
    new Record().doSomething();
  }, []);

  // 영상 불러오기

  const requestVideo = () => {
    console.log("request video : ", getCookie("videoId"));
    axios({
      method: "get",
      url: network.baseURL + "shadowing-player",
      params: { videoId: getCookie("videoId") },
      headers: { "ACCESS-TOKEN": getCookie("jwt") },
    }).then((res) => {
      console.log(res);
      videoCode = res.data.data.videoURL.split("=")[1];
      shouldVideoEvaluation = !res.data.data.videoEvaluation;
      setTitle(res.data.data.videoName);
      console.log(`video code : ${videoCode}`);
      script = res.data.data.sentences.map((it) => {
        return {
          sentence: it.content,
          begin: getSecondsFromTime(it.startTime),
          end: getSecondsFromTime(it.endTime),
        };
      });
      setVideo(videoCode);
      setUrl(`https://youtu.be/${videoCode}`);
      setScript(player, script);
      setDragSelect(player, script);
    });
  };

  const setVideo = (videoCode) => {
    player = new YTPlayer("#player", { width: 800, height: 456 });
    console.log("player");

    player.load(videoCode);

    player.on("playing", () => {
      console.log(player.getDuration());
    });

    player.on("timeupdate", (seconds) => {
      setCurrentSentence();
      if (shouldVideoEvaluation && seconds / player.getDuration() > 0.9)
        requestVideoEvaluation();
    });
  };

  // 현재 스크립트 -> 자막
  let preSentence = null;
  const setCurrentSentence = () => {
    let curSecond = player.getCurrentTime();
    for (let i = 0; i < script.length; ++i) {
      if (
        script[`${i}`].begin <= curSecond &&
        curSecond <= script[`${i}`].end
      ) {
        const targetTag = document.getElementById("caption");
        if (targetTag != null) targetTag.innerText = script[`${i}`].sentence;
        if (preSentence !== null) preSentence.style.color = "#FFFFFF";
        preSentence = document.getElementById(`idx${i}`);
        preSentence.style.color = "#00FFD3";
        break;
      }
    }
  };

  const requestVideoEvaluation = () => {
    openModal();
    // 일단 두 번은 안 물어보도록
    shouldVideoEvaluation = false;
  };

  const selectTab = (type) => {
    setContentType(type);
    document.getElementsByClassName("tab")[type].classList.add("selected");
    document
      .getElementsByClassName("tab")
      [(type + 1) % 2].classList.remove("selected");
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="wrap">
      <Header />
      <div className="youtube-background">
        <div className="container">
          <div className="youtube-player">
            <div className="video-frame">
              <h2>
                <i className="xi-youtube-play xi-x" /> 내가 변환한 유튜브 콘텐츠
              </h2>
              <h1>{title}</h1>
              <div id="player" />
              <div className="caption" id="caption">
                Our hearts wore never broken
              </div>
              <a href={url}>
                <i className="xi-link" /> {url}
              </a>
              <Footer />
            </div>

            <div className="script">
              <button
                className="tab selected"
                onClick={() => {
                  selectTab(0);
                }}
              >
                <i className="xi-file-text-o" />
                Script
              </button>
              <button
                className="tab"
                onClick={() => {
                  selectTab(1);
                }}
              >
                <i className="xi-microphone xi-x" /> Rec.
              </button>

              <div className="content">
                <Scrollbar style={{ width: 400, height: 640 }}>
                  <ul
                    id="script"
                    style={{ display: contentType === 0 ? "block" : "none" }}
                  >
                    <li className="">
                      <button className="time-stamp">1:23</button>
                      <p>더미 텍스트 ^^</p>
                    </li>
                    {/* 이곳에 스크립트 렌더링  */}
                  </ul>

                  <ul
                    className="recoded-list"
                    style={{ display: contentType === 1 ? "block" : "none" }}
                  >
                    <li>
                      <input type="checkbox" id="chk-hear-mic" />
                      <button id="record">녹음</button>
                      <button id="stop">중지</button>
                      <audio id="audio" src="#" controls="true" />
                    </li>
                    <li>
                      <i className="xi-microphone icon" />
                      <h3>녹음된 목록 3</h3>
                      <p className="time-line">00:08 - 00:42</p>
                      <p className="datetime">2021.07.29. 13:41</p>
                    </li>
                    <li>
                      <i className="xi-microphone icon" />
                      <h3>녹음된 목록 2</h3>
                      <p className="time-line">00:08 - 00:42</p>
                      <p>2021.07.28. 13:41</p>
                    </li>
                    <li>
                      <i className="xi-microphone icon" />
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <EvaluationModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export function getSecondsFromTime(seconds) {
  return (
    parseInt(seconds.split(":")[0]) * 3600 +
    parseInt(seconds.split(":")[1]) * 60 +
    parseFloat(seconds.split(":")[2])
  );
}

export default YoutubePlayer;

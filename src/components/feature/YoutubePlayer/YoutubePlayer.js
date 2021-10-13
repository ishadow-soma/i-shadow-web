import axios from "axios";
import "./YoutubePlayer.css";
import Modal from "react-modal";
import setScript from "./setScript";
import Dropdown from "react-dropdown";
import { FaStop } from "react-icons/fa";
import network, { repeatStore } from "global/store/store";
import RecordedList from "./RecordedList";
import setDragSelect from "./setDragSelect";
import Recorder from "global/record/Recorder";
import EvaluationModal from "./EvaluationModal";
import React, { useEffect, useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import Script from "components/feature/YoutubePlayer/Script";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { modalStyle } from "global/styles/customStyles";
import { getScript, getTitle, requestVideoInfo } from "global/player/setPlayer";
import logOnlyDevelopment from "global/log/log";

const YTPlayer = require("yt-player");

function YoutubePlayer() {
  const [title, setTitle] = useState("제목");
  const [url, setUrl] = useState("null");
  const [contentType, setContentType] = useState(0); // 0 : 플레이어, 1 : 녹음
  let player;
  let script;
  let videoCode;
  let shouldVideoEvaluation;
  const [modalIsOpen, setIsOpen] = useState(false);

  const [options, setOptions] = useState([]);
  const [defaultOption, setDefaultOption] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recorder = new Recorder(setIsRecording);

  useEffect(() => {
    requestVideo();
    recorder.setRecorder(setOptions, setDefaultOption);

    return () => {
      player.destroy();
      if (repeatStore.getState()) clearInterval(repeatStore.getState());
    };
  }, []);

  // 영상 불러오기
  const requestVideo = async () => {
    const res = await requestVideoInfo();
    setVideoInfo(res.data);
    setVideo(res.data);
    setScript(player, script);
    setDragSelect(player, script);
  };

  const setVideoInfo = (data) => {
    logOnlyDevelopment(data);
    videoCode = data.videoURL.split("=")[1];
    setTitle(getTitle(data.videoName));
    setUrl(`https://youtu.be/${videoCode}`);
    shouldVideoEvaluation = !data.videoEvaluation;
  };

  const setVideo = (data) => {
    script = getScript(data.sentences);

    logOnlyDevelopment("setScript");

    player = new YTPlayer("#player", { width: 800, height: 456 });
    logOnlyDevelopment("player");

    player.load(videoCode);

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
        setCaption(i);
        resetPreviousSentence();
        setCurrentSentenceColor(i);
        break;
      }
    }
  };
  const setCaption = (idx) => {
    const targetTag = document.getElementById("caption");
    if (targetTag != null) targetTag.innerText = script[`${idx}`].sentence;
  };
  const resetPreviousSentence = () => {
    if (preSentence !== null) preSentence.classList.remove("current-sentence");
  };
  const setCurrentSentenceColor = (idx) => {
    preSentence = document.getElementById(`idx${idx}`);
    if (preSentence.classList) preSentence.classList.add("current-sentence");
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
                <i className="xi-youtube-play xi-x" />
                내가 변환한 유튜브 콘텐츠
              </h2>
              <h1>{title}</h1>
              <div id="player" />
              <div className="caption">
                <p id="caption">Our hearts were never broken</p>
                <div
                  className="record-icon"
                  style={{ visibility: isRecording ? "visible" : "hidden" }}
                >
                  <FaStop id="stop" />
                </div>
                <i
                  className="xi-microphone record-icon"
                  id="record"
                  style={{ visibility: isRecording ? "hidden" : "visible" }}
                />
              </div>
              <a href={url}>
                <i className="xi-link" /> {url}
              </a>
              <Dropdown
                options={options}
                value={defaultOption}
                onChange={(item) => recorder.setAudioEnvironment(item.value)}
                placeholder="Select an option"
                className="dropdown"
                placeholderClassName="test1"
                arrowClosed={<AiOutlineArrowDown className="arrow-closed" />}
                arrowOpen={<AiOutlineArrowUp className="arrow-open" />}
              />
              <Footer />
            </div>

            <div className="script">
              <div className="tabs">
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
                <button
                  className="tab"
                  onClick={() => {
                    selectTab(2);
                  }}
                >
                  <i className="xi-bookmark-o" /> Bookmark
                </button>
              </div>

              <div className="content">
                <Scrollbar style={{ width: 400, height: 640 }}>
                  <ul
                    id="script"
                    style={{ display: contentType === 0 ? "block" : "none" }}
                  />
                  <RecordedList contentType={contentType} />
                </Scrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <EvaluationModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default YoutubePlayer;

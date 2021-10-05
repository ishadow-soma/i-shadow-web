import React, { useEffect, useRef, useState } from "react";
import Header from "components/common/Header/Header";
import Footer from "components/common/Footer/Footer";
import ReactPlayer from "react-player";
import "components/feature/CustomPlayer.css";
import { Scrollbar } from "react-scrollbars-custom";
import setDragSelect from "../YoutubePlayer/setDragSelect";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Dropdown from "react-dropdown";
import Recorder from "global/record/Recorder";
import { getCookie } from "global/store/cookie";
import axios from "axios";
import network from "global/store/store";
import setScript from "../YoutubePlayer/setScript";
import { getSecondsFromTime, getTitle } from "../YoutubePlayer/YoutubePlayer";
import Modal from "react-modal";
import EvaluationModal from "../YoutubePlayer/EvaluationModal";
import { FaStop } from "react-icons/fa";
import RecordedList from "../YoutubePlayer/RecordedList";

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

function VideoPlayer() {
  const [contentType, setContentType] = useState(0); // 0 : 플레이어, 1 : 녹음
  const player = useRef(null);
  const [title, setTitle] = useState("제목");
  const [options, setOptions] = useState([]);
  const [defaultOption, setDefaultOption] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const recorder = new Recorder(setIsRecording);
  let shouldVideoEvaluation;
  let script;

  useEffect(() => {
    requestVideo();
    setRecorder();
  }, []);

  // 영상 불러오기
  const requestVideo = async () => {
    console.log("request video : ", getCookie("videoId"));
    const res = await axios({
      method: "get",
      url: network.baseURL + "shadowing-player",
      params: { videoId: getCookie("videoId") },
      headers: { "ACCESS-TOKEN": getCookie("jwt") },
    });
    setVideoInfo(res.data.data);
    setVideo(res.data.data);
    setScript(player, script);
    setDragSelect(player, script);
  };

  const setVideoInfo = (data) => {
    console.log(data);
    setTitle(getTitle(data.videoName));
    shouldVideoEvaluation = !data.videoEvaluation;
  };

  const setVideo = (data) => {
    script = getScript(data.sentences);
    console.log("setScript");

    console.log("player");
  };

  const getScript = (sentences) => {
    return sentences.map((sentence) => {
      return {
        sentence: sentence.content,
        begin: getSecondsFromTime(sentence.startTime),
        end: getSecondsFromTime(sentence.endTime),
      };
    });
  };

  // 현재 스크립트 -> 자막
  let preSentence = null;
  const setCurrentSentence = () => {
    let curSecond = player.current.getCurrentTime();
    console.log(script);
    return;
    for (let i = 0; i < script.length; ++i) {
      if (
        script[`${i}`].begin <= curSecond &&
        curSecond <= script[`${i}`].end
      ) {
        const targetTag = document.getElementById("caption");
        if (targetTag != null) targetTag.innerText = script[`${i}`].sentence;
        if (preSentence !== null)
          preSentence.classList.remove("current-sentence");
        preSentence = document.getElementById(`idx${i}`);
        preSentence.classList.add("current-sentence");
        break;
      }
    }
  };

  // 녹음 세팅
  const setRecorder = () => {
    recorder.setAudioEnvironment(null);
    recorder.getConnectedAudioDevices().then((devices) => {
      for (let i = 0; i < devices.length; ++i) {
        options.push(devices[i]);
      }
      setOptions(options);
      setDefaultOption(options[0]);
    });
  };

  const selectTab = (type) => {
    setContentType(type);
    document.getElementsByClassName("tab")[type].classList.add("selected");
    document
      .getElementsByClassName("tab")
      [(type + 1) % 2].classList.remove("selected");
  };

  const onSeek = (seconds) => {
    player.current.seekTo(seconds, "seconds");
  };

  function onSelect(item) {
    console.log("onselect", item);
    recorder.setAudioEnvironment(item.value);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const requestVideoEvaluation = () => {
    openModal();
    // 일단 두 번은 안 물어보도록
    shouldVideoEvaluation = false;
  };

  return (
    <div className="wrap">
      <Header />
      <div className="container">
        <div className="audio-player custom-player">
          <div className="video-frame">
            <h2>
              <i className="xi-videocam" /> 내가 변환한 영상 콘텐츠
            </h2>
            <h1>{title}</h1>
            <span className="audio-background">
              <ReactPlayer
                onProgress={(time) => {
                  const callback = () => setCurrentSentence();
                  callback();
                  if (
                    shouldVideoEvaluation &&
                    time.playedSeconds / player.current.getDuration() > 0.9
                  )
                    requestVideoEvaluation();
                }}
                ref={player}
                controls={true}
                playing={true}
                width="800px"
                height="456px"
                url="http://ec2-3-34-122-103.ap-northeast-2.compute.amazonaws.com/video/2021-10-01/2021-10-01-4-test2.mp4"
              />
            </span>
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
            <Dropdown
              options={options}
              value={defaultOption}
              onChange={onSelect}
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
            </div>

            <div className="content">
              <Scrollbar style={{ width: 400, height: 640 }}>
                <ul
                  id="script"
                  style={{ display: contentType === 0 ? "block" : "none" }}
                >
                  <li className="">
                    <button className="time-stamp" onClick={() => onSeek(12)}>
                      0:12
                    </button>
                    <p>더미 텍스트 ^^</p>
                  </li>
                  {/* 이곳에 스크립트 렌더링  */}
                </ul>
                <RecordedList contentType={contentType} />
              </Scrollbar>
            </div>
          </div>
        </div>
      </div>

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <EvaluationModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default VideoPlayer;

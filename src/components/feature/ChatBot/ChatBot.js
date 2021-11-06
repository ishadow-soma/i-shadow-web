import Header from "components/common/Header/Header";
import "./ChatBot.css";
import { Scrollbar } from "react-scrollbars-custom";
import RecordedList from "../YoutubePlayer/RecordedList";
import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Footer from "../../common/Footer/Footer";
import { FaStop } from "react-icons/fa";
import Recorder from "../../../global/record/Recorder";

export default function ChatBot() {
  // 녹음
  const [recordingState, setRecordingState] = useState({
    options: [],
    defaultOption: null,
    isRecording: false,
  });
  const recorder = new Recorder((flag) => {
    setRecordingState({
      options: recordingState.options,
      defaultOption: recordingState.defaultOption,
      isRecording: flag,
    });
  });

  useEffect(() => {
    recorder.setRecorder(setRecordingState);
  }, []);

  return (
    <div className="wrap">
      <Header />
      <div className="container">
        <div className="chat-bot">
          <div className="flex-left">
            <div className="title">
              <h1>Chat Bot</h1>
            </div>
            <div className="temp">준비중입니다.</div>
            <div className="caption">
              <p id="caption">자막입니다.</p>
            </div>
            <div className="record-container">
              <Dropdown
                options={recordingState.options}
                value={recordingState.defaultOption}
                onChange={(item) => recorder.setAudioEnvironment(item.value)}
                placeholder="Select an option"
                className="dropdown"
                placeholderClassName="test1"
                arrowClosed={<AiOutlineArrowDown className="arrow-closed" />}
                arrowOpen={<AiOutlineArrowUp className="arrow-open" />}
              />
              <div className="mic">
                <i
                  className="xi-microphone record-icon"
                  id="record"
                  style={{
                    visibility: recordingState.isRecording
                      ? "hidden"
                      : "visible",
                  }}
                />
                <div
                  className="record-icon"
                  style={{
                    visibility: recordingState.isRecording
                      ? "visible"
                      : "hidden",
                  }}
                >
                  <FaStop id="stop" />
                </div>
                <div className="echo">
                  <input type="checkbox" id="chk-hear-mic" />
                  <span> Echo</span>
                </div>
              </div>
            </div>
            <Footer />
          </div>
          <div className="flex-right">
            <div className="tabs">
              <button className="tab selected">
                <i className="xi-file-text-o" />
                Script
              </button>
            </div>

            <div className="script">
              <Scrollbar style={{ width: 400, height: 640 }}>
                <ul id="script" />
              </Scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

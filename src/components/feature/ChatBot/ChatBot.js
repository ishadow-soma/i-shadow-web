import Header from "components/common/Header/Header";
import "./ChatBot.css";
import { Scrollbar } from "react-scrollbars-custom";
import RecordedList from "../YoutubePlayer/RecordedList";
import React from "react";
import Dropdown from "react-dropdown";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Footer from "../../common/Footer/Footer";

export default function ChatBot() {
  return (
    <div className="wrap">
      <Header />
      <div className="container">
        <div className="chat-bot">
          <div className="flex-left">
            <div className="title">
              <h1>Chat Bot</h1>
            </div>
            <div className="temp">임시로 만든 박스</div>
            <div className="caption">
              <p id="caption">자막자막자막</p>
            </div>
            <Dropdown
              placeholder="Select an option"
              className="dropdown"
              placeholderClassName="test1"
              arrowClosed={<AiOutlineArrowDown className="arrow-closed" />}
              arrowOpen={<AiOutlineArrowUp className="arrow-open" />}
            />
            <Footer />
          </div>
          <div className="flex-right">
            <div className="tabs">
              <button className="tab selected">
                <i className="xi-file-text-o" />
                Script
              </button>
              <button className="tab">
                <i className="xi-microphone xi-x" /> Rec.
              </button>
            </div>

            <div className="script">
              <Scrollbar style={{ width: 400, height: 640 }}>
                <ul id="script" />
                <RecordedList />
              </Scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

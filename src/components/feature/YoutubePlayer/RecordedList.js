import React, { useEffect } from "react";
import "./RecordedList.css";
import "react-audio-player";

export default function RecordedList(props) {
  const onStart = () => {
    document.getElementById("audio").play();
    document.getElementById("controls").classList.add("playing");
  };
  const onPause = () => {
    document.getElementById("audio").pause();
    document.getElementById("controls").classList.remove("playing");
  };

  return (
    <ul
      className="recoded-list"
      style={{ display: props.contentType === 1 ? "block" : "none" }}
    >
      <li>
        <p>녹음 결과</p>
        <div className="controls" id="controls">
          <i className="xi-play controls-icon" onClick={onStart} />
          <i className="xi-pause controls-icon" onClick={onPause} />
        </div>
        <audio id="audio" />
      </li>
    </ul>
  );
}

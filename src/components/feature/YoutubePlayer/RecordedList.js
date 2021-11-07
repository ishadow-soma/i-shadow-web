import React, { useEffect, useState } from "react";
import "./RecordedList.css";
import "react-audio-player";
import logOnlyDevelopment from "../../../global/log/log";

export default function RecordedList(props) {
  let duration = 0;
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
      <li className="recorded-item">
        <audio id="audio" controls={true} />
      </li>
    </ul>
  );
}

import React, { useEffect, useState } from "react";
import "./RecordedList.css";
import "react-audio-player";
import logOnlyDevelopment from "../../../global/log/log";

export default function RecordedList(props) {
  const onStart = () => {
    const audio = document.getElementById("audio");
    audio.play();
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
        <p id="track-time">00:00</p>
        <div className="controls" id="controls">
          <i className="xi-play controls-icon" onClick={onStart} />
          <i className="xi-pause controls-icon" onClick={onPause} />
        </div>
        <span id="record-date-time">2021-00-00 00:00</span>
        <audio
          id="audio"
          onTimeUpdate={(e) => {
            setTimeout(() => {
              const duration = document.getElementById("fake-audio").duration;
              document.getElementById("track-time").innerText = `${Math.floor(
                e.target.currentTime / 60
              )}:${Math.floor(e.target.currentTime)} / ${Math.floor(
                duration / 60
              )}:${Math.floor(duration)}`;
            }, 40);
          }}
        />
        <audio
          style={{
            visibility: "hidden",
          }}
          id="fake-audio"
          onLoadedMetadata={(e) => {
            if (e.target.duration === Infinity) {
              e.target.currentTime = 1e101;
              e.target.ontimeupdate = function () {
                e.target.ontimeupdate = () => {};
                e.target.currentTime = 0;
              };
            }
          }}
        />
      </li>
    </ul>
  );
}

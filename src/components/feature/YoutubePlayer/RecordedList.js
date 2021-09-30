import React from "react";

export default function RecordedList(props) {
  return (
    <ul
      className="recoded-list"
      style={{ display: props.contentType === 1 ? "block" : "none" }}
    >
      <li>
        <input type="checkbox" id="chk-hear-mic" />
        에코
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
  );
}

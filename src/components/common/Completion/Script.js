import React, { useEffect } from "react";

export default function Script(props) {
  useEffect(() => {
    console.log("props", props.script);
  });

  return (
    <ul style={{ display: props.contentType === 0 ? "block" : "none" }}>
      <li className="">
        <button className="time-stamp">1:13</button>
        <p>더미 텍스트 ^^</p>
      </li>
      {props.script.map((sentence, index) => {
        return (
          <li>
            <button className="time-stamp item" id={`idx${index}`}>
              {getTimeStamp(sentence.begin)}
            </button>
            <p>{sentence.sentence}</p>
          </li>
        );
      })}
    </ul>
  );
}

function getTimeStamp(begin) {
  return `${parseInt(begin / 60)}:${parseInt(begin % 60)}`;
}

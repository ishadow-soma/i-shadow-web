import React, { useEffect } from "react";
import setDragSelect from "components/feature/YoutubePlayer/setDragSelect";

export default function Script(props) {
  useEffect(() => {
    setDragSelect();
  });

  const onSeek = (seconds = 40) => {
    console.log("player", props.player);
    props.player.seek(seconds);
    const selectedItem = document.getElementsByClassName("ds-selected")[0];
    selectedItem.classList.remove("ds-selected");
  };

  return (
    <ul style={{ display: props.contentType === 0 ? "block" : "none" }}>
      <li>
        <button className="time-stamp" onClick={() => onSeek}>
          1:13
        </button>
        <p>더미 텍스트 ^^</p>
      </li>
      {props.script.map((sentence, index) => {
        return (
          <li className="item">
            <button
              className="time-stamp"
              id={`idx${index}`}
              onClick={() => onSeek(30)}
            >
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

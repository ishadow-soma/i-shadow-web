import React, { useEffect } from "react";
import setDragSelect from "components/feature/YoutubePlayer/setDragSelect";

export default function Script(props) {
  useEffect(() => {
    console.log("script rendered", props.script);
    setDragSelect();
  }, []);

  const onSeek = (seconds = 40) => {
    console.log("player", props.player);
    props.player.seek(seconds);
    const selectedItem = document.getElementsByClassName("ds-selected")[0];
    removeClass(selectedItem, "ds-selected");
  };

  const removeClass = (element, className) => {
    if (element === undefined) return;

    if (element.className.search(className) !== -1)
      element.className = element.className.replace(className, " ").trim();
  };

  if (props.player)
    return (
      <ul style={{ display: props.contentType === 0 ? "block" : "none" }}>
        <li className="">
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
  else return <div>스크립트 렌더링 중입니다.</div>;
}

function getTimeStamp(begin) {
  return `${parseInt(begin / 60)}:${parseInt(begin % 60)}`;
}

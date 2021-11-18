import React, { useEffect } from "react";
import "./Bookmark.css";

export default function Bookmark(props) {
  useEffect(() => {
    console.log("rer", props.sentences);
  }, []);
  return (
    <ul
      className="bookmark-list"
      style={{ display: props.contentType === 2 ? "block" : "none" }}
    >
      {props.sentences.map((sentence) => {
        return (
          <li>
            <button className="time-stamp">
              {sentence.startTime.slice(2, 7)}
            </button>
            <p>{sentence.content}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function getTimeStamp(time) {
  console.log("time", time);
  return `${parseInt(time / 60)}:${parseInt(time % 60)}`;
}

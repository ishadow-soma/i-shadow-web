import React, { useState } from "react";
import { setCookie } from "global/store/cookie";
import { FaPlay } from "react-icons/fa";
import logOnlyDevelopment from "../../../global/log/log";

export default function VideoContents(props) {
  let [childrenCount, setChildrenCount] = useState(
    8 + (props.isContent ? 4 : 0)
  );

  return (
    <>
      <ul id="converted-video">
        <li>
          <div
            className="add-content"
            id="add-youtube-content"
            onClick={() => {
              props.openModal(0);
            }}
          >
            <i className="xi-plus-circle xi-3x" />
            <p>유튜브 콘텐츠 추가하기</p>
          </div>
        </li>
        {props.videos
          .filter((it, index) => index < childrenCount)
          .map((it) => createListItem(it))}
      </ul>
      <div onClick={showMore}>
        <i className="xi-angle-down show-more" />
      </div>
    </>
  );

  function showMore() {
    setChildrenCount(childrenCount + 12);
  }

  function createListItem(video) {
    return (
      <li>
        <div
          className="youtube-content"
          style={{ backgroundImage: `url('${video.thumbNailURL}')` }}
          onClick={() => {
            if (props.videoType === 0) redirectYoutube(video.videoId);
            else redirectVideo(video.videoId);
          }}
        >
          <p>{video.title}</p>
          <div className="icon-wrap">
            <FaPlay className="play-icon" />
          </div>
        </div>
      </li>
    );
  }

  function redirectYoutube(videoId) {
    logOnlyDevelopment("비디오 아이디", videoId);
    setCookie("videoId", videoId, {
      path: "/",
      secure: true,
      sameSite: "none",
    });

    window.location.href = "/youtube";
  }

  function redirectVideo(videoId) {
    logOnlyDevelopment("비디오 아이디", videoId);
    setCookie("videoId", videoId, {
      path: "/",
      secure: true,
      sameSite: "none",
    });

    window.location.href = "/video";
  }
}

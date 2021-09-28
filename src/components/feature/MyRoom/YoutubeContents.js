import React from "react";
import { setCookie } from "global/store/cookie";
import { FaPlay } from "react-icons/fa";

export default function YoutubeContents(props) {
  return (
    <ul id="converted-youtube">
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
      {props.videos.map((it) => createListItem(it))}
    </ul>
  );

  function createListItem(video) {
    return (
      <li>
        <div
          className="youtube-content"
          style={{ backgroundImage: `url('${video.thumbNailURL}')` }}
          onClick={() => redirectYoutube(video.videoId)}
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
    console.log("비디오 아이디", videoId);
    setCookie("videoId", videoId, {
      path: "/",
      secure: true,
      sameSite: "none",
    });

    window.location.href = "/youtube";
  }
}

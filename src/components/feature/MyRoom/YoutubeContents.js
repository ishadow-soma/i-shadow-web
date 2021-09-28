import React from "react";
import { setCookie } from "global/store/cookie";
import { FaPlay } from "react-icons/fa";

export default function YoutubeContents(props) {
  return (
    <ul id="converted-youtube">
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

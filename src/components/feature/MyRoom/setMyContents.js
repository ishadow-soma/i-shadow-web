import { setCookie } from "global/store/cookie";
import { FaPlay } from "react-icons/fa";
import React from "react";

export default function setMyContents(video, props) {
  function insertYoutubeContent(video) {
    const insertHere = document.getElementById("converted-youtube");
    const li = createListItem(video);

    insertHere.insertBefore(li, insertHere.firstChild);
  }

  const createListItem = (video) => {
    const result = document.createElement("li");
    const thumbnailElement = createThumbnail(video);

    result.append(thumbnailElement);

    return result;
  };

  const createThumbnail = (video) => {
    const result = document.createElement("div");
    const icon = createPlayIcon();
    const titleElement = createContentTitle(video.title);

    result.className = "youtube-content";
    result.onclick = () => redirectYoutube(video.videoId);
    result.style.backgroundImage = `url('${video.thumbNailURL}')`;
    result.append(titleElement);
    result.append(icon);

    return result;
  };

  const createContentTitle = (title) => {
    const result = document.createElement("p");
    result.innerText = title;
    return result;
  };

  const createPlayIcon = () => {
    const result = document.createElement("i");
    result.className = "xi-play xi-2x";
    return result;
  };

  function redirectYoutube(videoId) {
    setCookie("videoId", videoId, {
      path: "/",
      secure: true,
      sameSite: "none",
    });

    props.history.push("/youtube");
  }

  insertYoutubeContent(video);
}

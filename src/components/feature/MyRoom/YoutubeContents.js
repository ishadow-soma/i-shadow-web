import React from "react";

export default function YoutubeContents(props) {
  return (
    <ul id="converted-youtube">
      {props.videos.map((it) => createListItem(it))}
    </ul>
  );
  //    result.style.backgroundImage = `url('${video.thumbNailURL}')`;
  function createListItem(video) {
    console.log(video);
    return (
      <li>
        <div
          className="youtube-content"
          style={{ backgroundImage: `url('${video.thumbNailURL}')` }}
        >
          <i className="xi-play xi-2x" />
          <p>{video.title}</p>
        </div>
      </li>
    );
  }
}

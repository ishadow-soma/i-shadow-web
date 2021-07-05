import './YoutubePlayer.css';
import React from "react";

const youtubeCode = ['1eAZvWm0gE0', 'd-HK6DFi3MA']

function YoutubePlayer() {
  return (
    <div className="youtube-container">
      <iframe width="1120" height="630" src={"https://www.youtube.com/embed/" + youtubeCode[1]} title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>

      </iframe>
    </div>
  );
}

export default YoutubePlayer;
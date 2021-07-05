import './YoutubePlayer.css';
import React, {Component} from "react";

let youtubeCode = ['1eAZvWm0gE0', 'd-HK6DFi3MA']

function YoutubePlayer() {
  return (
    <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + youtubeCode[1]} title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>

    </iframe>
  );
}

export default YoutubePlayer;
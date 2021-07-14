import './YoutubePlayer.css';
import React, {useState} from "react";


const youtubeCode = ['1eAZvWm0gE0', 'd-HK6DFi3MA']

function YoutubePlayer({match}) {
  const btnClick = () => {
    console.log("player");/*
    if(player){
      player.seek(30);
    }*/
  };

  return (
    <div className="youtube-player">

      <iframe
              width="1120" height="630" src={"https://www.youtube.com/embed/" + youtubeCode[1]} title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
      </iframe>
      param : {match.url}
      <button onClick={btnClick}>123</button>
    </div>
  );
}

function codeInYoutubeURL(url) {
  const testURL = 'https://www.youtube.com/watch?v=ozlRWpLnMSk&list=LL&index=25';

  let youtubeURL = url.toString();
  let idx = youtubeURL.indexOf("?");
  let result = youtubeURL.substr(idx + 3, 11);
  console.log(result);

  return result;
}

export default YoutubePlayer;
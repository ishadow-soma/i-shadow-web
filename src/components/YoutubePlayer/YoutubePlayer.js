import './YoutubePlayer.css';
import React, {useEffect, useState} from "react";

const youtubeCode = ['1eAZvWm0gE0', 'd-HK6DFi3MA'];
const YTPlayer = require('yt-player');

function YoutubePlayer({match}) {
  var player, seconds = 0;

  useEffect(() => {
    player = new YTPlayer('#player');
    console.log('player');

    player.load(youtubeCode[1]);

    player.on('playing', () => {
      console.log(player.getDuration()) // => 351.521
    })
  })

  const onSeek = (seconds = 40) => {
    console.log('button clicked!');
    player.seek(seconds);
  };

  return (
    <div className="youtube-player">
      <div>
        <h2>내가 변환한 유튜브 콘텐츠</h2>
        <h1>The Intern - Official Trailer [HD]</h1>
        <element id="player" />
        <div>
          자막
        </div>
        <a href="">https://www.youtube.com/watch?v=1abcde23abs</a>
      </div>

      <div>
        <ul>
          <li>
            <button onClick={() => onSeek(59)}>0:59</button>
            <p>Loving can hurt</p>
          </li>
          <li>
            <button onClick={() => onSeek(60+23)}>1:23</button>
            <p>loving can hurt sometimes</p>
          </li>
          <li>
            <button onClick={() => onSeek(60+56)}>1:56</button>
            <p>But it's the only thing that I know</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default YoutubePlayer;
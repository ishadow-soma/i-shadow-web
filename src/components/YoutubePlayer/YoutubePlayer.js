import './YoutubePlayer.css';
import React from "react";

const youtubeCode = ['1eAZvWm0gE0', 'd-HK6DFi3MA']

function YoutubePlayer({match}) {
  return (
    <div className="youtube-container">
      <iframe width="1120" height="630" src={"https://www.youtube.com/embed/" + youtubeCode[1]} title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
      </iframe>
      abd : {match.url}
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
import React from "react";
import './YoutubeURL.css'

function YoutubeURL() {
  return (
    <div>
      <h1>Youtube URL</h1>
      <p>유튜브 URL을 입력해 주세요.</p>
      <form name="youtube-form" method="get" action="">
        <input placeholder="Youtube URL" name="url"/>

        <button>확인</button>
        <button>취소</button>
      </form>
    </div>
  );
}

export default YoutubeURL;
import {Link} from "react-router-dom";
import React from "react";

function YoutubeURLDialog() {
  return (
    <dialog id="inputURLDialog" className="dialog">
      <form name="youtube-form" method="get" action="">
        <p>dialog</p>
        <input placeholder="Youtube URL" name="url"/>

        <Link to="/youtube">제출</Link>
        <button value="cancel">취소</button>
      </form>
    </dialog>
  );
}

export default YoutubeURLDialog;
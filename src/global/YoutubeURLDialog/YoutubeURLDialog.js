import {Link} from "react-router-dom";
import React from "react";
import './YoutubeURLDialog.css'

function YoutubeURLDialog() {
  return (
    <dialog id="input-url-dialog" className="dialog">
      <form name="youtube-form" method="get" action="">
        <input placeholder="Youtube URL" name="url"/>

        <div className="baseline">
          <div className="btn">
            <Link to="/youtube">제출</Link>
          </div>
          <button value="cancel">취소</button>
        </div>

      </form>
    </dialog>
  );
}

export default YoutubeURLDialog;
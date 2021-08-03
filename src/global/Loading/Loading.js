import React from "react";
import "./Loading.css"

function Loading(props) {
  return (
    <div className="loading" style={{display: props.show ? "block" : "none"}}>
      <p>어떤 콘텐츠를 업로드 중인지 표시하는 공간</p>
      <div className="progress-bar">
        <div className="progress"/>
      </div>
    </div>
  );
}

export default Loading;
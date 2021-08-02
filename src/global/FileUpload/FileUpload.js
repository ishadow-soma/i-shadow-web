import React from "react";
import "./FileUpload.css"

function FileUpload() {
  return (
    <div className="file-upload">
      <div className="btn-upload">
        <i className="xi-headset large-icon"/>
        <h2>음성파일 선택</h2>
        <div className="filebox">
          <label htmlFor="ex_file">파일선택</label>
          <input type="file" id="ex_file"/>
        </div>
      </div>
      <div className="btn-upload">
        <i className="xi-videocam large-icon"/>
        <h2>영상파일 선택</h2>
        <div className="filebox">
          <label htmlFor="ex_file">파일선택</label>
          <input type="file" id="ex_file"/>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
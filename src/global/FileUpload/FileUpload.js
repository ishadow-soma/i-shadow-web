import React from "react";
import "./FileUpload.css";

function FileUpload(props) {
  return (
    <div>
      <div className="file-upload">
        <div className="btn-upload">
          <i className="xi-headset large-icon" />
          <h2>음성파일 선택</h2>
          <div className="filebox">
            <label htmlFor="ex_file">파일선택</label>
            <input type="file" id="ex_file" />
          </div>
        </div>
        <div className="btn-upload">
          <i className="xi-videocam large-icon" />
          <h2>영상파일 선택</h2>
          <div className="filebox">
            <label htmlFor="ex_file">파일선택</label>
            <input type="file" id="ex_file" />
          </div>
        </div>
      </div>

      <div className="btn-container">
        <button
          type="submit"
          value="ok"
          className="ok"
          onClick={() => {
            alert("아직 지원하지 않는 기능입니다.");
          }}
        >
          확인
        </button>
        <button
          type="submit"
          value="cancel"
          className="cancel"
          onClick={props.cancelAction}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default FileUpload;

import React from "react";
import "./FileUpload.css";
import axios from "axios";
import network from "global/store/store";
import { getCookie } from "global/store/cookie";

function FileUpload(props) {
  const onOk = () => {
    const formBody = new FormData();
    const file = document.querySelector("#file");
    formBody.append("type", "UPLOAD");
    formBody.append("file", file[0]);
    formBody.append("categoryId", [20]);
    //props.setMode(props.type.LOADING);

    axios({
      method: "post",
      url: network.baseURL + "media",
      data: formBody,
      headers: {
        "ACCESS-TOKEN": getCookie("jwt"),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert("콘텐츠 생성에 실패했습니다. (catch)");
        console.log(err);
      });
  };

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
            <input type="file" id="file" />
          </div>
        </div>
      </div>

      <div className="btn-container">
        <button type="submit" value="ok" className="button-ok" onClick={onOk}>
          확인
        </button>
        <button
          type="submit"
          value="cancel"
          className="button-cancel"
          onClick={props.cancelAction}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default FileUpload;

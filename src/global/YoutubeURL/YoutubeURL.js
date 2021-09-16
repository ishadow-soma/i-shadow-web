import React from "react";
import "./YoutubeURL.css";
import axios from "axios";
import network from "global/store/store";
import { getCookie, setCookie } from "../store/cookie";

function YoutubeURL(props) {
  const onClickOk = () => {
    const inputUrl = document.getElementById("youtube-url").value;
    console.log("input url : " + inputUrl);
    const formBody = new FormData();
    formBody.append("type", "YOUTUBE");
    formBody.append("youtubeURL", inputUrl);
    formBody.append("categoryId", [20]);

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
          setCookie("videoId", res.data.data.videoId, {
            path: "/",
            secure: true,
            sameSite: "none",
          });
          window.location.href = "/youtube";
          props.setMode(props.type.LOADING);
        } else {
          alert("서버로 요청하는 과정에서 변환에 실패했습니다!");
        }
      })
      .catch((err) => {
        // TODO : 잘못된 input 값 front 에서 판별하기
        // TODO : 만약 서버에서 공유 URL 처리가 안 되어 있다면 프론트에서 파싱해서 주기.
        alert("예외 발생! 변환에 실패했습니다.");
        console.log("변환 실패!", err);
      });
  };

  return (
    <div className="youtube-url">
      <div className="url-input">
        <input
          type="text"
          placeholder="ex) https://www.youtube.com/watch?v=1abcde23abs"
          id="youtube-url"
        />
      </div>

      <div className="btn-container">
        <button type="submit" value="ok" className="ok" onClick={onClickOk}>
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

export default YoutubeURL;

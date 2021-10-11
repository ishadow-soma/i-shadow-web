import React from "react";
import "./YoutubeURL.css";
import axios from "axios";
import network from "global/store/store";
import { getCookie, setCookie } from "global/store/cookie";
import logOnlyDevelopment from "../../../global/log/log";

function YoutubeURL(props) {
  const onClickOk = () => {
    const inputUrl = document.getElementById("youtube-url").value;
    logOnlyDevelopment("input url : " + inputUrl);
    const formBody = new FormData();
    formBody.append("type", "YOUTUBE");
    formBody.append("youtubeURL", inputUrl);
    formBody.append("categoryId", [20]);
    props.setMode(props.type.LOADING);

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
        logOnlyDevelopment(res);
        if (res.data.success) {
          setCookie("videoId", res.data.data.videoId, {
            path: "/",
            secure: true,
            sameSite: "none",
          });
          window.location.href = "/youtube";
        } else {
          logOnlyDevelopment(
            "서버로 요청하는 과정에서 변환에 실패했습니다!",
            res.data.message
          );
          props.onFail(res.data.message);
        }
      })
      .catch((err) => {
        // TODO : 잘못된 input 값 front 에서 판별하기
        // TODO : 만약 서버에서 공유 URL 처리가 안 되어 있다면 프론트에서 파싱해서 주기.
        logOnlyDevelopment("변환 실패!", err);
        props.onFail("서버로 요청하는 과정에서 변환에 실패했습니다! (catch)");
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
        <button className="button-ok" onClick={onClickOk}>
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

export default YoutubeURL;

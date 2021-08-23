import React, {useEffect, useState} from "react";
import "./Dialog.css"
import FileUpload from "global/FileUpload/FileUpload";
import Loading from "global/Loading/Loading";
import Completion from "global/Completion/Completion";
import Fail from "global/Fail/Fail";
import { Redirect } from 'react-router-dom';
import YoutubeURL from "../YoutubeURL/YoutubeURL";

const type = {
  YOUTUBE_URL: 0,
  UPLOAD: 1,
  LOADING: 2,
  COMPLETION: 3,
  FAIL: 4,
}

const style = {
  display: "none",
}

function Dialog(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState(props.type);
  const [onlyCancel, setOnlyCancel] = useState(false);

  useEffect(() => {
    setDescription(props.description);
  }, [props.description]);

  useEffect(() => {
    if(mode === type.YOUTUBE_URL) {
      setTitle("Youtube URL");
      setDescription("유튜브 URL을 입력해 주세요.");
    }
    if(mode === type.UPLOAD) {
      setTitle("File Upload");
      setDescription("음성파일 혹은 영상파일을 업로드 하세요.");
    }
  }, [title, description, mode]);

  const onOkClick = () => {
    if(mode === type.COMPLETION) {
      console.log(window.history);
      window.location.href = "/youtube";
      return;
    }

    setDescription("콘텐츠 제작 중...");
    setMode(2);
    setInterval(() => {onComplete()}, 1000);
  }

  const onComplete = () => {
    setDescription("콘텐츠 제작 완료");
    setMode(3);
  }

  const onFail = () => {
    setDescription("콘텐츠 제작에 실패했습니다.");
    setOnlyCancel(true);
    setMode(4);
  }

  return (
    <div className="modal">
      <h1>{title}</h1>
      <p>{description}</p>

      {/* 유튜브 URL */}
      <YoutubeURL show={mode === type.YOUTUBE_URL}/>
      {/* 파일 업로드 */}
      <div id="file-upload" style={mode === type.UPLOAD ? null : style}><FileUpload/></div>
      {/* 로딩 */}
      <Loading show={mode === type.LOADING}/>
      {/* 완료 */}
      <Completion show={mode === type.COMPLETION}/>
      {/* 실패 */}
      <Fail show={mode === type.FAIL}/>

      <div className="btn-container">
        <button type="submit" value="ok" className="ok" style={{display: onlyCancel ? "none" : "block"}} onClick={onOkClick}>확인</button>
        <button type="submit" value="cancel" className="cancel" onClick={props.cancelAction}>취소</button>
      </div>
    </div>
  );
}

export default Dialog;
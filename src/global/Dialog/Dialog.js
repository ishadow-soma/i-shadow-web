import React, {useEffect, useState} from "react";
import "./Dialog.css"
import FileUpload from "../FileUpload/FileUpload";
import Loading from "../Loading/Loading";
import Completion from "../Completion/Completion";
import Fail from "../Fail/Fail";

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
  }, []);

  useEffect(() => {
    if(mode === type.YOUTUBE_URL) {
      setTitle("Youtube URL");
      setDescription("유튜브 URL을 입력해 주세요.");
    }
    if(mode === type.UPLOAD) {
      setTitle("File Upload");
      setDescription("음성파일 혹은 영상파일을 업로드 하세요.");
    }
  }, [title, description]);

  const onOkClick = () => {
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

      <form action="" method="GET">
        {/* 유튜브 URL */}
        <div style={mode === type.YOUTUBE_URL ? null : style} className="input-container">
          <input type="text" placeholder="ex) https://www.youtube.com/watch?v=1abcde23abs"/>
        </div>
        {/* 파일 업로드 */}
        <div id="file-upload" style={mode === type.UPLOAD ? null : style}><FileUpload/></div>
        {/* 로딩 */}
        <Loading show={mode === type.LOADING}/>
        {/* 완료 */}
        <Completion show={mode === type.COMPLETION}/>
        {/* 실패 */}
        <Fail show={mode === type.FAIL}/>
      </form>
      <div className="btn-container">
        <button type="submit" value="ok" className="ok" style={{display: onlyCancel ? "none" : "block"}} onClick={onOkClick}>확인</button>
        <button type="submit" value="cancel" className="cancel" onClick={props.cancelAction}>취소</button>
      </div>
    </div>
  );
}

export default Dialog;
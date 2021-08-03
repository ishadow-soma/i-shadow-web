import React, {useEffect, useState} from "react";
import "./Dialog.css"
import FileUpload from "../FileUpload/FileUpload";

const type = {
  YOUTUBE_URL: 0,
  UPLOAD: 1,
}

const style = {
  display: "none",
}

function Dialog(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState(props.type);

  useEffect(() => {
    setDescription(props.description);
  }, []);

  useEffect(() => {
    if(mode === 0) {
      setTitle("Youtube URL");
      setDescription("유튜브 URL을 입력해 주세요.");
    }
    if(mode === 1) {
      setTitle("File Upload");
      setDescription("음성파일 혹은 영상파일을 업로드 하세요.");
    }
  }, [title, description]);
  
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

        <div className="btn-container">
          <button type="submit" value="ok" className="ok">확인</button>
          <button type="submit" value="cancel" className="cancel">취소</button>
        </div>
      </form>
    </div>
  );
}

export default Dialog;
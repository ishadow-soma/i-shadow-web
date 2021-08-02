import React, {useState} from "react";
import "./Dialog.css"
import FileUpload from "../FileUpload/FileUpload";

const style = {
  display: "none",
}

function Dialog(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [mode, setMode] = "upload";

  return (
    <div className="modal">
      <h1>{title}</h1>
      <p>{description}</p>

      <form action="" method="GET">
        <div style={mode !== "youtube" ? null : style} className="input-container">
          <input type="text" placeholder="ex) https://www.youtube.com/watch?v=1abcde23abs"/>
        </div>
        <div id="file-upload" style={mode !== "upload" ? null : style}>
          <FileUpload/>
        </div>

        <div className="btn-container">
          <button type="submit" value="ok" className="ok">확인</button>
          <button type="submit" value="cancel" className="cancel">취소</button>
        </div>
      </form>
    </div>
  );
}

export default Dialog;
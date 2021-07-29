import React, {useState} from "react";
import "./Modal.css"

function Modal(props) {
  const [title, setTitle] = useState('Youtube URL');
  const [description, setDescription] = useState('유튜브 URL을 입력해 주세요.');

  return (
    <div className="modal">
      <h1>{title}</h1>
      <p>{description}</p>
      <form action="" method="GET">
        <div className="input-container">
          <input type="text" placeholder="ex) https://www.youtube.com/watch?v=1abcde23abs"/>
        </div>
        <div className="btn-container">
          <button type="submit" value="ok" className="ok">확인</button>
          <button type="submit" value="cancel" className="cancel">취소</button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
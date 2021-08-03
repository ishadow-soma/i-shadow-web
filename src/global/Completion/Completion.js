import React, {useState} from "react";
import "./Compeletion.css"

function Completion(props) {
  const [content, setContent] = useState("제작된 콘텐츠");

  return (
    <div className="completion" style={{display: props.show ? "block" : "none"}}>
      <p><span>제작된 콘텐츠명 : </span>{content}</p>
    </div>
  );
}

export default Completion;
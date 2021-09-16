import React, { useState } from "react";
import "./Compeletion.css";

function Completion() {
  const [content, setContent] = useState("제작된 콘텐츠");

  return (
    <div className="completion">
      <p>
        <span>
          <i className="xi-check-circle-o" /> 제작된 콘텐츠명 :{" "}
        </span>
        {content}
      </p>
    </div>
  );
}

export default Completion;

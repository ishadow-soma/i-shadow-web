import React, { useState } from "react";
import "./Fail.css";

function Fail(props) {
  const [reason] = useState(props.reason ? props.reason : "알 수 없는 오류");

  return (
    <div className="fail">
      <p>
        <span>
          <i className="xi-close-circle-o" /> 실패 사유{" "}
        </span>
        : {reason}
      </p>
    </div>
  );
}

export default Fail;

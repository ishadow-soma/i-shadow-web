import React, {useState} from "react";
import "./Fail.css"

function Fail(props) {
  const [reason, setReason] = useState("잘못된 형식입니다.")

  return (
    <div className="fail" style={{display: props.show ? "block" : "none"}}>
      <p><span>실패 사유 </span>: {reason}</p>
    </div>
  );
}

export default Fail;
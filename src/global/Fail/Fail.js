import React from "react";

function Fail() {
  return (
    <div>
      <h1>File Upload</h1>
      <p>변환에 실패했습니다.</p>
      <div>
        <p>실패 사유 : 파일 용량이 너무 큽니다.</p>
      </div>
    </div>
  );
}

export default Fail;
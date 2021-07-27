import React from "react";

function FileUpload() {
  return (
    <div>
      <h1>file upload</h1>
      <p>음성파일 혹은 영상파일을 업로드 하세요.</p>

      <div>
        <div>
          <h2>음성파일 선택</h2>
          <input type="file"/>
        </div>
        <div>
          <h2>영상파일 선택</h2>
          <input type="file"/>
        </div>
      </div>

      <div>
        <button>
          확인
        </button>
        <button>
          취소
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
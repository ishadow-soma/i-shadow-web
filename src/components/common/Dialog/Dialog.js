import React, { useEffect, useState } from "react";
import "./Dialog.css";
import FileUpload from "components/common/FileUpload/FileUpload";
import Loading from "components/common/Loading/Loading";
import Completion from "components/common/Completion/Completion";
import Fail from "components/common/Fail/Fail";
import YoutubeURL from "components/common/YoutubeURL/YoutubeURL";

const type = {
  YOUTUBE_URL: 0,
  UPLOAD: 1,
  LOADING: 2,
  COMPLETION: 3,
  FAIL: 4,
};

const style = {
  display: "none",
};

function Dialog(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState(props.type);
  const [, setOnlyCancel] = useState(false);

  useEffect(() => {
    setDescription(props.description);
  }, [props.description]);

  useEffect(() => {
    if (mode === type.YOUTUBE_URL) {
      setTitle("Youtube URL");
      setDescription("유튜브 URL을 입력해 주세요.");
    }
    if (mode === type.UPLOAD) {
      setTitle("File Upload");
      setDescription("음성파일 혹은 영상파일을 업로드 하세요.");
    }
    if (mode === type.LOADING) {
      setDescription(
        "제작이 완료되면 화면이 전환됩니다. 이 화면에서 벗어나도 됩니다."
      );
    }
  }, [title, description, mode]);

  const onComplete = () => {
    setDescription("콘텐츠 제작 완료");
    setMode(3);
  };

  const onFail = () => {
    setDescription("콘텐츠 제작에 실패했습니다.");
    setOnlyCancel(true);
    setMode(4);
  };

  const getModal = () => {
    switch (mode) {
      case type.YOUTUBE_URL:
        return (
          <YoutubeURL
            cancelAction={props.cancelAction}
            setMode={setMode}
            type={type}
            onFail={onFail}
          />
        );
      case type.UPLOAD:
        return (
          <div id="file-upload">
            <FileUpload
              cancelAction={props.cancelAction}
              setMode={setMode}
              type={type}
              onFail={onFail}
            />
          </div>
        );
      case type.LOADING:
        return <Loading />;
      case type.COMPLETION:
        return <Completion />;
      case type.FAIL:
      default:
        return <Fail show={mode === type.FAIL} />;
    }
  };

  return (
    <div className="modal">
      <h1>{title}</h1>
      <p>{description}</p>
      {getModal()}
    </div>
  );
}

export default Dialog;

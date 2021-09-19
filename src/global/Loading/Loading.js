import React, { useEffect, useState } from "react";
import "./Loading.css";

function Loading(props) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setInterval(() => {
      moveProgress(progress);
      setProgress(progress + 10);
    }, 1000);
  }, [progress]);

  const moveProgress = (progress) => {
    document.getElementsByClassName("progress")[0].style.width = `${
      progress === 100 ? 100 : progress % 100
    }%`;
  };

  return (
    <div className="loading">
      <p>섀도잉 콘텐츠를 만들고 있습니다.</p>
      <div className="progress-bar">
        <div className="progress" />
      </div>
    </div>
  );
}

export default Loading;

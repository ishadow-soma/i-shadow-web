import React, { useEffect, useState } from "react";
import "./Loading.css";

function Loading(props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    updateProgress();
  }, []);

  const updateProgress = () => {
    setInterval(() => {
      setProgress((progress) => (progress + 10) % 100);
      console.log(progress);
    }, 1000);
  };

  return (
    <div className="loading">
      <p>섀도잉 콘텐츠를 만들고 있습니다.</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: progress + "%" }} />
      </div>
    </div>
  );
}

export default Loading;

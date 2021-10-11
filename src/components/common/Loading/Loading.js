import React, { useEffect, useState } from "react";
import "./Loading.css";
import logOnlyDevelopment from "../../../global/log/log";

function Loading(props) {
  const [progress, setProgress] = useState(0);
  let interval;

  useEffect(() => {
    updateProgress();
  }, []);

  useEffect(() => {
    clearInterval(interval);
  });

  const updateProgress = () => {
    interval = setInterval(() => {
      setProgress((progress) => (progress + 10) % 100);
      logOnlyDevelopment(progress);
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

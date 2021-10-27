import React, { useEffect, useState } from "react";
import "./Loading.css";
import loading from "assets/loading.gif";

function Loading() {
  return (
    <div className="loading">
      <p>섀도잉 콘텐츠를 만들고 있습니다.</p>
      <img src={loading} alt="this slowpoke moves" className="loading-icon" />
    </div>
  );
}

export default Loading;

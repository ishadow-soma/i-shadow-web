import Header from "components/common/Header/Header";
import React from "react";

export default function Contents() {
  return (
    <div className="contents">
      <Header />
      <div className="contents">
        <div className="container">
          <h1>CONTENTS</h1>
          <div>
            <div className="level-filter">난이도</div>
            <div className="category-filter">카테고리</div>
            <div className="content">영상들...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

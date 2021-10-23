import Header from "components/common/Header/Header";
import React from "react";
import "rc-slider";
import { Range } from "rc-slider";
import "./Contents.css";

export default function Contents() {
  return (
    <div className="wrap">
      <Header />
      <div className="contents">
        <div className="container">
          <h1>CONTENTS</h1>
          <div className="box">
            <div className="level-filter">
              <div className="filter">
                <p>난이도 필터링</p>
              </div>
              <Range count={5} />
            </div>
            <div className="category-filter">
              <div className="filter">
                <p>카테고리 필터링</p>
              </div>
              <div className="categories">
                <span className="item">라이프 스타일</span>
                <span className="item">게임</span>
                <span className="item">엔터테인먼트</span>
                <span className="item">취미</span>
                <span className="item">음악/댄스</span>
                <span className="item">여행/아웃도어</span>
                <span className="item">푸드/쿠킹</span>
                <span className="item">차/배/바이크</span>
                <span className="item">뷰티/패션</span>
                <span className="item">스포츠/건강</span>
                <span className="item">인물/유명인</span>
                <span className="item">경제/금융/재테크</span>
                <span className="item">영화/애니메이션</span>
                <span className="item">뉴스/정치/이슈</span>
                <span className="item">IT/기술/과학</span>
                <span className="item">교육/강의</span>
                <span className="item">키즈</span>
                <span className="item">기관/단체/정부</span>
                <span className="item">동물/펫</span>
                <span className="item">ALL</span>
              </div>
            </div>
            <div className="content">영상들...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

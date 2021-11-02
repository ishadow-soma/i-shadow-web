import Header from "components/common/Header/Header";
import React, { useEffect, useState } from "react";
import { Range } from "react-range";
import "./Contents.css";
import VideoContents from "../MyRoom/VideoContents";
import axios from "axios";
import network from "../../../global/store/store";
import { getCookie } from "../../../global/store/cookie";
import logOnlyDevelopment from "../../../global/log/log";

export default function Contents() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    requestContents();
  }, []);

  async function requestContents() {
    const res = await axios({
      method: "get",
      url: network.baseURL + "media",
      headers: { "ACCESS-TOKEN": getCookie("jwt") },
      params: {
        categoryId: 20,
        levelStart: 0,
        leverEnd: 5,
        page: 1,
        videoType: 1,
      },
    });
    if (process.env.NODE_ENV === "development")
      logOnlyDevelopment("변환된 콘텐츠", res.data.data.videoList);

    setContents(
      res.data.data.videoList.map((it) => {
        return {
          title: it.videoName,
          thumbNailURL: it.thumbNailURL,
          videoId: it.videoId,
        };
      })
    );
  }

  const [values, setValues] = useState([0.5, 5]);

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
                <Range
                  step={0.5}
                  min={0.5}
                  max={5}
                  values={values}
                  onChange={(values) => setValues(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#ccc",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "24px",
                        width: "24px",
                        backgroundColor: "#FFF",
                        border: "#2F7AF9 solid 3px",
                        borderRadius: "12px",
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="category-filter">
              <div className="filter">
                <p>카테고리 필터링</p>
              </div>
              <div className="categories">
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  라이프 스타일
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  게임
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  엔터테인먼트
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  취미
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  음악/댄스
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  여행/아웃도어
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  푸드/쿠킹
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  차/배/바이크
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  뷰티/패션
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  스포츠/건강
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  인물/유명인
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  경제/금융/재테크
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  영화/애니메이션
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  뉴스/정치/이슈
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  IT/기술/과학
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  교육/강의
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  키즈
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  기관/단체/정부
                </span>
                <span className="item" onClick={(e) => onSelect(e.target)}>
                  동물/펫
                </span>
                <span
                  className="item selected"
                  onClick={(e) => onSelect(e.target)}
                >
                  ALL
                </span>
              </div>
            </div>
            <div className="content">
              <VideoContents videos={contents} videoType={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function onSelect(target) {
  document.getElementsByClassName("selected")[0].classList.remove("selected");
  target.classList.add("selected");
}

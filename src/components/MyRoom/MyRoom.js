import React, {useEffect, useState} from "react";
import "./MyRoom.css"
import {Link} from "react-router-dom";

function MyRoom() {
  const [point, setPoint] = useState(500);
  const [nickname, setNickname] = useState('algosketch@gamil.com');

  useEffect(() => {
      setPoint(500);
    }
  );

  return (
    <div className="my-room">
      <div className="container">
        <div className="my-room-header">
          <h1><span className="nickname">{nickname}</span> 님의 MY ROOM</h1>
          <div className="my-point">
            <p>보유 포인트 <span>{point}</span>point</p>
            <Link to="/payment">충전하기 <i className="xi-help-o"/></Link>
          </div>
        </div>

        <div className="content">
          <div>
            <div className="converted-content video-content">
              <h2>내가 변환한 유튜브 콘텐츠</h2>
            </div>

            <div className="converted-content video-content">
              <h2>내가 변환한 영상 콘텐츠</h2>
            </div>
          </div>

          <div className="converted-content audio-content">
            <h2>내가 변환한 음성 콘텐츠</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyRoom;
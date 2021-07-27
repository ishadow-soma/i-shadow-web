import React, {useEffect, useState} from "react";

function MyRoom() {
  let [point, setPoint] = useState(500);

  useEffect(() => {
      setPoint(500);
    }
  );

  return (
    <div>
      <h1>### 님의 MY ROOM</h1>
      <p>보유 포인트 {point}point
        <div><a href="">충전하기</a><img src="" alt="instruction"/></div>
      </p>

      <div>
        <div>
          <h2>내가 변환한 유튜브 콘텐츠</h2>
        </div>

        <div>
          <h2>내가 변환한 영상 콘텐츠</h2>
        </div>
      </div>

      <div>
        <h2>내가 변환한 음성 콘텐츠</h2>
      </div>
    </div>
  );
}

export default MyRoom;
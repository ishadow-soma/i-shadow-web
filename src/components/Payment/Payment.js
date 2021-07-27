import React from "react";

function Payment() {
  return (
    <div className="payment">
      <h1>포인트 충전</h1>
      <p>1포인트 = 1분짜리 영상을 변환할 수 있습니다.</p>
      
      <div>
        <ul>
          <li>
            <p>
              15point
              <a href="">\1,000원 결제하기</a>
            </p>
          </li>
          <li>
            <p>
              45point
              <a href="">\3,000원 결제하기</a>
            </p>
          </li>
          <li>
            <p>
              75point
              <a href="">\5,000원 결제하기</a>
            </p>
          </li>
          <li>
            <p>
              1500point
              <a href="">\10,000원 결제하기</a>
            </p>
          </li>
          <li>
            <p>
              450point
              <a href="">\30,000원 결제하기</a>
            </p>
          </li>
          <li>
            <p>
              750point
              <a href="">\50,000원 결제하기</a>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Payment;
import React from "react";
import "./Payment.css"

function Payment() {
  return (
    <div className="payment">
      <div className="container">
        <div className="payment-header">
          <h1>포인트 충전</h1>
          <p className="description">1포인트 = 1분짜리 영상을 변환할 수 있습니다.</p>
        </div>

        <div className="payment-model">
          <ul>
            <li>
              <p><span>15</span>point</p>
              <a href="">1,000원 결제하기</a>
            </li>
            <li>
              <p><span>45</span>point</p>
              <a href="">3,000원 결제하기</a>
            </li>
            <li>
              <p><span>75</span>point</p>
              <a href="">5,000원 결제하기</a>
            </li>
            <li>
              <p><span>150</span>point</p>
              <a href="">10,000원 결제하기</a>
            </li>
            <li>
              <p><span>450</span>point</p>
              <a href="">30,000원 결제하기</a>
            </li>
            <li>
              <p><span>750</span>point</p>
              <a href="">50,000원 결제하기</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Payment;
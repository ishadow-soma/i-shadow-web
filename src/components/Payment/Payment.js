import React from "react";
import "./Payment.css"
import Header from "global/Header/Header";
import {Link} from "react-router-dom";

function Payment() {
  return (
    <div className="wrap">
      <Header/>
      <div className="payment">
        <div className="container">
          <div className="payment-header">
            <h1>포인트 충전</h1>
            <p className="description">1포인트 = 1분짜리 영상을 변환할 수 있습니다.</p>
          </div>

          <div className="payment-model">
            <ul>
              <li>
                <p><span className="p-icon">P</span><span>15</span>point</p>
                <Link to="/">1,000원 결제하기</Link>
              </li>
              <li>
                <p><span className="p-icon">P</span><span>45</span>point</p>
                <Link to="/">3,000원 결제하기</Link>
              </li>
              <li>
                <p><span className="p-icon">P</span><span>75</span>point</p>
                <Link to="/">5,000원 결제하기</Link>
              </li>
              <li>
                <p><span className="p-icon">P</span><span>150</span>point</p>
                <Link to="/">10,000원 결제하기</Link>
              </li>
              <li>
                <p><span className="p-icon">P</span><span>450</span>point</p>
                <Link to="/">30,000원 결제하기</Link>
              </li>
              <li>
                <p><span className="p-icon">P</span><span>750</span>point</p>
                <Link to="/">50,000원 결제하기</Link>
              </li>
            </ul>
          </div>
        </div>
    </div>

    </div>
  );
}

export default Payment;
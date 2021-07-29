import React from "react";
import "./PaymentMethod.css"

function PaymentMethod() {
  return (
    <div className="payment-method">
      <h1>결제 정보</h1>
      <p className="description">선택한 상품을 확인하시고, 결제 수단을 선택해 주세요.</p>

      <div className="card">
        <h2>주문 상품</h2>
        <div className="selected-model">
          <p><strong>45</strong>point</p>
          <p><strong>3,000</strong>원</p>
        </div>

        <h2>결제 수단</h2>

        <div className="selection">
          <input type="button" name="temp" value="신용카드"/>
          <input type="button" name="temp" value="휴대폰결제"/>
          <input type="button" name="temp" value="카카오페이" className="selected"/>
        </div>
        <p className="description">
          카카오페이는 카카오톡앱에 카드나 카카오머니를 등록하여 결제 비밀번호 또는 지문인증으로 결제할 수 있는 간편결제 서비스입니다. <br/><br/>
          카드(신용/체크): 카카오페이에 카드를 등록하여 사용 가능 <br/>
          카카오머니: 카카오페이에 계좌 연결하여 사용 가능
        </p>
        <button>결제하기</button>
      </div>
    </div>
  );
}

export default PaymentMethod;
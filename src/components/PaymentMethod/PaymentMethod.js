import React from "react";

function PaymentMethod() {
  return (
    <div>
      <h1>결제 정보</h1>
      <p>선택한 상품을 확인하시고, 결제 수단을 선택해 주세요.</p>

      <div>
        <h2>주문 상품</h2>
        <p>
          45point
          <a href="">\3,000원 결제하기</a>
        </p>
        <h2>결제 수단</h2>

        <ul>
          <li>
            신용카드
            <input type="radio" name="temp" value="신용카드" checked="true"/>
          </li>
          <li>
            휴대폰 결제
            <input type="radio" name="temp" value="휴대폰 결제"/>
          </li>
          <li>
            카카오 페이
            <input type="radio" name="temp" value="카카오 페이"/>
          </li>
        </ul>
        <p>
          카카오페이는 카카오톡앱에 카드나 카카오머니를 등록하여 결제 비밀번호 또는 지문인증으로 결제할 수 있는 간편결제 서비스입니다. <br/>
          카드(신용/체크): 카카오페이에 카드를 등록하여 사용 가능 <br/>
          카카오머니: 카카오페이에 계좌 연결하여 사용 가능
        </p>
        <button>결제하기</button>
      </div>
    </div>
  );
}

export default PaymentMethod;
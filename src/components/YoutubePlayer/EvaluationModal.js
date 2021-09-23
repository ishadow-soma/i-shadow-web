import React from "react";
import axios from "axios";
import network from "global/store/store";
import { getCookie } from "global/store/cookie";

export default function EvaluationModal(props) {
  const evaluate = () => {
    const value = parseFloat(
      document.querySelector('input[name="evaluation"]:checked').value
    );
    console.log(typeof value);
    axios({
      method: "post",
      url: network.baseURL + `media/${getCookie("videoId")}/level`,
      headers: { "ACCESS-TOKEN": getCookie("jwt") },
      data: {
        Level: value,
        content: "???",
      },
    })
      .then((res) => {
        console.log("평가", res);
      })
      .catch((err) => console.log("실패", err));

    props.closeModal();
  };

  return (
    <div>
      <h1>영상의 난이도를 평가해 주세요.</h1>
      <p>1.0 - NH, 2.0 - IL, 3.0 - IM2, 4.0 - IH, 5.0 - AL</p>
      <input type="radio" name="evaluation" value="0.5" />
      0.5
      <input type="radio" name="evaluation" value="1.0" />
      1.0
      <input type="radio" name="evaluation" value="1.5" />
      1.5
      <input type="radio" name="evaluation" value="2.0" />
      2.0
      <input type="radio" name="evaluation" value="2.5" />
      2.5
      <input type="radio" name="evaluation" value="3.0" />
      3.0
      <input type="radio" name="evaluation" value="3.5" />
      3.5
      <input type="radio" name="evaluation" value="4.0" />
      4.0
      <input type="radio" name="evaluation" value="4.5" />
      4.5
      <input type="radio" name="evaluation" value="5.0" />
      5.0
      <br />
      <button onClick={evaluate}>평가하기</button>
      <button onClick={props.closeModal}>건너뛰기</button>
    </div>
  );
}

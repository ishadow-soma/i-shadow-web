import React from "react";
import axios from "axios";
import network from "global/store/store";
import { getCookie } from "global/store/cookie";
import ReactStars from "react-rating-stars-component";
import "./EvaluationModal.css";

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
    <div className="evaluation-modal">
      <h1>영상의 난이도를 평가해 주세요.</h1>
      <p>
        난이도 평가 가이드
        <br /> 1.0 - NH, 2.0 - IL, 3.0 - IM2, 4.0 - IH, 5.0 - AL
      </p>
      <ReactStars
        count={5}
        size={36}
        isHalf={true}
        emptyIcon={<i className="far fa-star" />}
        halfIcon={<i className="fa fa-star-half-alt" />}
        fullIcon={<i className="fa fa-star" />}
        activeColor="#ffd700"
      />
      <div>
        <button onClick={evaluate}>평가하기</button>
        <button onClick={props.closeModal}>건너뛰기</button>
      </div>
    </div>
  );
}

import React from "react";
import axios from "axios";
import network from "global/store/store";
import { getCookie } from "global/store/cookie";
import ReactStars from "react-rating-stars-component";
import "./EvaluationModal.css";

export default function EvaluationModal(props) {
  let rating = 2.5;

  const evaluate = () => {
    axios({
      method: "post",
      url: network.baseURL + `media/${getCookie("videoId")}/level`,
      headers: { "ACCESS-TOKEN": getCookie("jwt") },
      data: {
        Level: rating,
        content: "???",
      },
    })
      .then((res) => {
        console.log("평가", res);
      })
      .catch((err) => console.log("실패", err));

    props.closeModal();
  };

  const ratingChanged = (value) => {
    rating = value;
  };

  return (
    <div className="evaluation-modal">
      <h1>영상의 난이도를 평가해 주세요.</h1>
      <ReactStars
        count={5}
        size={48}
        isHalf={true}
        value={2.5}
        onChange={ratingChanged}
        emptyIcon={<i className="far fa-star" />}
        halfIcon={<i className="fa fa-star-half-alt" />}
        fullIcon={<i className="fa fa-star" />}
        activeColor="#ffd700"
      />
      <p>
        난이도 평가 가이드
        <br /> 1.0 - NH, 2.0 - IL, 3.0 - IM2, 4.0 - IH, 5.0 - AL
      </p>
      <div className="btn-container">
        <button onClick={evaluate} className="button-ok">
          평가하기
        </button>
        <button onClick={props.closeModal} className="button-cancel">
          건너뛰기
        </button>
      </div>
    </div>
  );
}

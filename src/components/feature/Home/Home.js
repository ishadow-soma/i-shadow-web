import React, { useEffect, useState } from "react";
import "./Home.css";
import network from "global/store/store";
import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import Dialog from "components/common/Dialog/Dialog";
import { user } from "global/store/store";
import Modal from "react-modal";
import axios from "axios";
import { setCookieDefaultOption } from "global/store/cookie";
import { modalStyle } from "global/styles/customStyles";
import logOnlyDevelopment from "../../../global/log/log";

function Home(props) {
  const [modal, setModal] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const location = props.location;
    // 네이버 로그인
    if (location.hash) {
      // URI 에서 토큰 가져오기
      const token = props.location.hash.split("=")[1].split("&")[0];
      logOnlyDevelopment(token);
      axios
        .post(network.baseURL + "users", {
          sns: "NAVER",
          userToken: token,
        })
        .then((res) => {
          // if 신규 회원 else 기존 회원
          if (res.data.success)
            setCookieDefaultOption("jwt", res.data.data.jwt);
          else loginWithNaver(token);
          props.history.push("/");
          setTimeout(() => window.location.reload(), 200);
        })
        .catch((err) => logOnlyDevelopment("실패", err));
    }
  });

  const loginWithNaver = async (token) => {
    logOnlyDevelopment("네이버 로그인 로그인 시도");
    await axios
      .post(network.baseURL + "login", {
        sns: "NAVER",
        userToken: token,
      })
      .then((res) => {
        if (res.data.success) setCookieDefaultOption("jwt", res.data.data.jwt);
        else logOnlyDevelopment("네이버 로그인 실패!");
      })
      .catch((err) => logOnlyDevelopment(err));
  };

  function openModal(type) {
    setModal(type);
    if (user.isLogin) setIsOpen(true);
    else {
      alert("로그인이 필요합니다.");
      props.history.push("/login");
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="wrap">
      <Header />
      <main>
        <div className="flex-left">
          <div
            onClick={() => {
              openModal(0);
            }}
            className="card"
          >
            <h2>Youtube URL</h2>
            <p>
              유튜브 URL로 <br />
              손쉽게 콘텐츠를 추가해 보세요.
            </p>
            <span>start now →</span>
            <i className="xi-youtube-play xi-5x" />
          </div>

          <div
            onClick={() => {
              openModal(1);
            }}
            className="card"
          >
            <h2>File Upload</h2>
            <p>
              영상 또는 음성 파일을 업로드해 <br />
              손쉽게 콘텐츠를 추가해 보세요.
            </p>
            <span>start now →</span>
            <i className="xi-upload xi-5x" />
          </div>
          <Footer />
        </div>
        <div className="flex-right">
          <span className="home-background" />
        </div>

        {/* 모달 */}
        <div id="modal">
          <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={modalStyle}
          >
            <Dialog type={modal} cancelAction={closeModal} />
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default Home;

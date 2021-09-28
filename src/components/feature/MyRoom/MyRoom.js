import React, { useEffect, useState } from "react";
import "./MyRoom.css";
import { Link } from "react-router-dom";
import Header from "components/common/Header/Header";
import Footer from "components/common/Footer/Footer";
import Dialog from "components/common/Dialog/Dialog";
import Modal from "react-modal";
import network, { user } from "global/store/store";
import axios from "axios";
import { getCookie, setCookie } from "global/store/cookie";
import setMyContents from "./setMyContents";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "15px",
  },
};

function MyRoom(props) {
  const [point, setPoint] = useState(111);
  const [nickname, setNickname] = useState("null");
  const [modal, setModal] = useState(1);

  useEffect(() => {
    if (!user.isLogin) {
      alert("로그인이 필요합니다.");
      props.history.push("/login");
    }
    requestYoutubeContent();
    setMyRoom();
  }, []);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const setMyRoom = () => {
    setNickname(user.name);
    setPoint(user.myPoint);
  };

  function openModal(type) {
    setIsOpen(true);
    setModal(type);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function requestYoutubeContent() {
    axios({
      method: "get",
      url: network.baseURL + "users/my-room",
      headers: { "ACCESS-TOKEN": getCookie("jwt") },
    }).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        res.data.data.youtubeVideos.forEach((it) => {
          setMyContents(it, props);
        });
      }
    });
  }

  return (
    <div className="wrap">
      <Header />
      <div className="my-room">
        <div className="container">
          <div className="my-room-header">
            <h1>
              <span className="nickname">{nickname}</span> 님의 MY ROOM
            </h1>
            <div className="my-point">
              <p>
                보유 포인트 <span>{point}</span>point
              </p>
              <Link to="/payment">
                충전하기 <i className="xi-help-o" />
              </Link>
            </div>
          </div>

          <div className="content">
            <div>
              <div className="converted-content video-content">
                <div className="decoration">
                  <i className="xi-youtube-play xi-x" />
                </div>
                <h2>내가 변환한 유튜브 콘텐츠</h2>
                <ul id="converted-youtube">
                  <li>
                    <div
                      className="add-content"
                      id="add-youtube-content"
                      onClick={() => {
                        openModal(0);
                      }}
                    >
                      <i className="xi-plus-circle xi-3x" />
                      <p>유튜브 콘텐츠 추가하기</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="converted-content video-content">
                <div className="decoration">
                  <i className="xi-videocam xi-x" />
                </div>
                <h2>내가 변환한 영상 콘텐츠</h2>
                <ul>
                  <li>
                    <div
                      className="add-content"
                      onClick={() => {
                        openModal(1);
                      }}
                    >
                      <i className="xi-plus-circle xi-3x" />
                      <p>영상 콘텐츠 추가하기</p>
                    </div>
                  </li>
                </ul>
              </div>
              <Footer />
            </div>

            <div className="converted-content audio-content">
              <div className="decoration">
                <i className="xi-headset xi-x" />
              </div>
              <h2>내가 변환한 음성 콘텐츠</h2>
              <ul>
                <li>
                  <div
                    className="add-content"
                    onClick={() => {
                      openModal(1);
                    }}
                  >
                    <i className="xi-plus-circle xi-3x" />
                    <p>음성 콘텐츠 추가하기</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Dialog type={modal} cancelAction={closeModal} />
      </Modal>
    </div>
  );
}

export default MyRoom;
import React, {useEffect, useState} from "react";
import "./MyRoom.css"
import {Link} from "react-router-dom";
import Header from "../../global/Header/Header";
import Footer from "../../global/Footer/Footer";
import Dialog from "../../global/Dialog/Dialog";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '15px',
  },
};

function MyRoom() {
  const [point, setPoint] = useState(500);
  const [nickname, setNickname] = useState('algosketch@gamil.com');

  useEffect(() => {
      setPoint(500);
    }
  );

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="wrap">
      <Header/>
      <div className="my-room">
        <div className="container">
          <div className="my-room-header">
            <h1><span className="nickname">{nickname}</span> 님의 MY ROOM</h1>
            <div className="my-point">
              <p>보유 포인트 <span>{point}</span>point</p>
              <Link to="/payment">충전하기 <i className="xi-help-o"/></Link>
            </div>
          </div>

          <div className="content">
            <div>
              <div className="converted-content video-content">
                <div className="decoration">
                  <i className="xi-youtube-play xi-x"/>
                </div>
                <h2>내가 변환한 유튜브 콘텐츠</h2>
                <ul>
                  <li>
                    <div className="add-content" onClick={openModal}>
                      <i className="xi-plus-circle xi-3x"/>
                      <p>유튜브 콘텐츠 추가하기</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="converted-content video-content">
                <div className="decoration">
                  <i className="xi-videocam xi-x"/>
                </div>
                <h2>내가 변환한 영상 콘텐츠</h2>
                <li>
                  <div className="add-content" onClick={openModal}>
                    <i className="xi-plus-circle xi-3x"/>
                    <p>영상 콘텐츠 추가하기</p>
                  </div>
                </li>
              </div>
              <Footer/>
            </div>

            <div className="converted-content audio-content">
              <div className="decoration">
                <i className="xi-headset xi-x"/>
              </div>
              <h2>내가 변환한 음성 콘텐츠</h2>
              <ul>
                <li>
                  <div className="add-content" onClick={openModal}>
                    <i className="xi-plus-circle xi-3x"/>
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
        <Dialog title="Youtube URL" description="유튜브 URL을 입력해 주세요."/>
      </Modal>
    </div>
  );
}

export default MyRoom;
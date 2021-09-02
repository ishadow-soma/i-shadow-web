import React, {useEffect, useState} from "react";
import './Home.css';
import http from 'global/store/store';
import Footer from "global/Footer/Footer";
import Header from "global/Header/Header";
import Dialog from "global/Dialog/Dialog";
import Modal from "react-modal";
import axios from "axios";
import {getCookie, setCookie} from "../../global/store/cookie";

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

function Home(props) {
  const [modal, setModal] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const location = props.location;
    // 네이버 로그인
    if(location.hash) {
      // URI 에서 토큰 가져오기
      const token = props.location.hash.split('=')[1].split('&')[0];
      console.log(token);
      axios.post(http.baseURL + 'users', {
        "name": "",
        "email": "",
        "password": "",
        "sns": "NAVER",
        "userToken": token
      })
        .then((res) => {
          // 신규 회원임.
          if(res.data.success) {
            setCookie('jwt', res.data.data.jwt, {
              path: "/",
              secure: true,
              sameSite: "none"
            })
            console.log("네이버 로그인 회원가입 및 로그인 성공");
            console.log(res);
          }
          // 기존 회원 로그인
          else {
            axios.post(http.baseURL + 'login', {
              "name": "",
              "email": "",
              "password": "",
              "sns": "NAVER",
              "userToken": token
            }).then((res) => {

              if(res.data.success) {
                setCookie('jwt', res.data.data.jwt, {
                  path: "/",
                  secure: true,
                  sameSite: "none" });
                }
              else {
                console.log("네이버 로그인 실패!");
                console.log(res);
              }
            })
          }
        });
      props.history.push('/');
    }
  })

  function openModal(type) {
    setModal(type);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="wrap">
      <Header/>
      <main>
        <div className="flex-left">
          <div onClick={() => {openModal(0)}} className="card">
            <h2>Youtube URL</h2>
            <p>
              유튜브 URL로 <br/>
              손쉽게 콘텐츠를 추가해 보세요.
            </p>
            <span>start now →</span>
            <i className="xi-youtube-play xi-5x"/>
          </div>

          <div onClick={() => {openModal(1)}} className="card">
            <h2>File Upload</h2>
            <p>영상 또는 음성 파일을 업로드해 <br/>
              손쉽게 콘텐츠를 추가해 보세요.</p>
            <span>start now →</span>
            <i className="xi-upload xi-5x"/>
          </div>
          <Footer/>
        </div>
        <div className="flex-right">
          <span className="home-background"/>
        </div>

        {/* 모달 */}
        <div id="modal">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <Dialog type={modal} cancelAction={closeModal}/>
          </Modal>
        </div>
      </main>
    </div>
  )
}

export default Home;
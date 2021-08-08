import React, {useEffect, useState} from "react";
import './Home.css';
import http from '../../global/store/store';
import Footer from "../../global/Footer/Footer";
import Header from "../../global/Header/Header";
import Dialog from "../../global/Dialog/Dialog";
import Modal from "react-modal";
import axios from "axios";

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
    if(location.hash) {
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
          console.log(res);
        });
      alert('네이버로 로그인 성공!');
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
        <span className="home-background"/>

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
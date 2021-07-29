import YoutubeURL from "../../global/YoutubeURL/YoutubeURL";
import {Link, Route, Switch} from "react-router-dom";
import React, {useEffect} from "react";
import './Home.css';
import store from '../../global/store/store';
import Footer from "../../global/Footer/Footer";
import Header from "../../global/Header/Header";

function Home(props) {
  useEffect(() => {
    const location = props.location;
    if(location.hash) {
      const token = props.location.hash.split('=')[1].split('&')[0];
      store.token = token;
      alert('새로운 로그인 확인 : ', store.token);
      props.history.push('/');
    }
  })

  return (
    <div className="wrap">
      <Header/>
      <main>
        <div className="flex-left">
          <div onClick={openDialog} className="card">
            <h2>Youtube URL</h2>
            <p>
              유튜브 URL로 <br/>
              손쉽게 콘텐츠를 추가해 보세요.
            </p>
            <span>start now →</span>
            <i className="xi-youtube-play xi-5x"/>
          </div>

          <div onClick={openDialog} className="card">
            <h2>File Upload</h2>
            <p>영상 또는 음성 파일을 업로드해 <br/>
              손쉽게 콘텐츠를 추가해 보세요.</p>
            <span>start now →</span>
            <i className="xi-upload xi-5x"/>
          </div>
          <Footer/>
        </div>
        <span className="home-background"/>
      </main>
    </div>

  )
}

function openDialog() {
  let dialog = document.getElementById("input-url-dialog")
  if(typeof dialog.showModal === "function")
    dialog.showModal()
}

export default Home;
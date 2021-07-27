import YoutubeURL from "../../global/YoutubeURL/YoutubeURL";
import {Link, Route, Switch} from "react-router-dom";
import React, {useEffect} from "react";
import './Home.css';
import store from '../../global/store/store';

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
    <main>
      <div>
        <div onClick={openDialog}>
          <h2>Youtube URL</h2>
          <p>유튜브 URL로 손쉽게 콘텐츠를 추가해 보세요.</p>
          start now →
          <img src="" alt="youtube"/>
        </div>

        <div onClick={openDialog}>
          <h2>File Upload</h2>
          <p>영상 또는 음성 파일을 업로드해 손쉽게 콘텐츠를 추가해 보세요.</p>
          start now →

          <img src="" alt="file upload"/>
        </div>

        <p>대표자 : 가나다 / algosketch@gmail.com</p>
        <img src="" alt="play store"/>
        <img src="" alt="app store"/>
      </div>

      <div>
        <img src="" alt="conversation"/>
      </div>




    </main>
  )
}

function openDialog() {
  let dialog = document.getElementById("input-url-dialog")
  if(typeof dialog.showModal === "function")
    dialog.showModal()
}

export default Home;
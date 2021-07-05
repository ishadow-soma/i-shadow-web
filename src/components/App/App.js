import logo from '../../logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <header>
        header
      </header>
      <main>
        <input type="file" accept="audio/*, video/*"/>
        <button onClick={openDialog}>Youtube URL</button>
        <dialog id={"inputURLDialog"}>
          <form action="">
            <p>dialog</p>
            <input placeholder="Youtube URL"/>

            <button type="submit">제출</button>
            <button value="cancel">취소</button>
          </form>
        </dialog>
      </main>
    </div>
  );
}

function openDialog() {
  let dialog = document.getElementById("inputURLDialog")
  if(typeof dialog.showModal === "function")
    dialog.showModal()
}

export default App;

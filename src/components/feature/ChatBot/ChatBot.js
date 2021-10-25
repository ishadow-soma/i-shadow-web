import Header from "components/common/Header/Header";
import "./ChatBot.css";

export default function ChatBot() {
  return (
    <div className="wrap">
      <Header />
      <div className="chat-bot">
        <div className="container">
          <h1>Chat Bot</h1>
          <div className="flex-left"></div>
          <div className="flex-right"></div>
        </div>
      </div>
    </div>
  );
}

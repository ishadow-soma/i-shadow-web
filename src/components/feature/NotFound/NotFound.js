import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>
        <Link to="/">홈으로 돌아가기</Link>
      </h2>
      <br />
      <p>
        찾으시는 페이지가 존재하지 않습니다. <br />
        페이지가 삭제되었거나 입력하신 URL 이 잘못되었습니다.
      </p>
    </div>
  );
}

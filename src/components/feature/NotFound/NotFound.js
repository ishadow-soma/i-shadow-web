import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found container">
      <h1>404 NOT FOUND</h1>
      <h2>
        <Link to="/">
          <span>I shadow</span> 홈으로 돌아가기
        </Link>
      </h2>
    </div>
  );
}

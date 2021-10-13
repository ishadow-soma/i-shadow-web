export default function Bookmark(props) {
  return (
    <ul
      className="bookmark recoded-list"
      style={{ display: props.contentType === 2 ? "block" : "none" }}
    >
      <li>즐겨찾기</li>
    </ul>
  );
}

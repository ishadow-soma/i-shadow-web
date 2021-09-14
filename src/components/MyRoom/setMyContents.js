import {setCookie} from "../../global/store/cookie";

export default function setMyContents(videoId, title, thumbnail, props) {
  function insertYoutubeContent(videoId, title, thumbnail) {
    const insertHere = document.getElementById("converted-youtube");
    const li = createListItem(videoId, title, thumbnail);

    insertHere.insertBefore(li, insertHere.firstChild)
  }

  const createListItem = (videoId, title, thumbnail) => {
    const result = document.createElement("li");
    const thumbnailElement = createThumbnail(videoId, title, thumbnail);

    result.append(thumbnailElement);

    return result;
  }

  const createThumbnail = (videoId, title, thumbnail) => {
    const result = document.createElement("div");
    const icon = createPlayIcon();
    const titleElement = createContentTitle(title);

    result.className = "youtube-content";
    result.onclick = () => redirectYoutube(videoId);
    result.style.backgroundImage = `url('${thumbnail}')`;
    result.append(titleElement);
    result.append(icon);

    return result;
  }

  const createContentTitle = (title) => {
    const result = document.createElement("p");
    result.innerText = title;
    return result;
  }

  const createPlayIcon = () => {
    const result = document.createElement("i");
    result.className = "xi-play xi-2x";
    return result;
  }

  function redirectYoutube(videoId) {
    setCookie('videoId', videoId, {
      path: "/",
      secure: true,
      sameSite: "none"
    });

    props.history.push("/youtube");
  }

  insertYoutubeContent(videoId, title, thumbnail);
}
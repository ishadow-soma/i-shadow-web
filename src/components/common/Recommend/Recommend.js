import VideoController from "../../../controller/VideoController";
import logOnlyDevelopment from "../../../global/log/log";
import { useEffect, useState } from "react";
import "./Recommend.css";
import { setCookie } from "../../../global/store/cookie";

export default function Recommend() {
  const _controller = new VideoController();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    _controller.getRecommendedVideos().then((res) => {
      setVideos(res.data.data);
      console.log("sdfsdfsdfsdf");
    });
  }, []);

  return (
    <div className="recommended-videos">
      <h2>추천 영상</h2>
      <ul>
        {videos.map((video, index) => {
          if (index < 8)
            return (
              <li>
                <div className="item">
                  <div
                    className="background"
                    style={{ backgroundImage: `url('${video.thumbNailURL}')` }}
                    onClick={() => {
                      setCookie("videoId", video.videoId, {
                        path: "/",
                        secure: true,
                        sameSite: "none",
                      });

                      window.location.href = "/youtube";
                    }}
                  />
                  <p>{summary(video.videoName)}</p>
                </div>
              </li>
            );
        })}
      </ul>
    </div>
  );
}

function summary(string) {
  if (string.length < 40) return string;
  else {
    return `${string.slice(0, 39)}...`;
  }
}

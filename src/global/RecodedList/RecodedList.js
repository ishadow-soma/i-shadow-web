import React from "react";
import "./RecodedList.css";

function RecodedList() {
  return (
    <div className="recoded-list" style={{ display: "none" }}>
      <ul>
        <li>
          <i className="xi-microphone icon" />
          <h3>녹음된 목록 3</h3>
          <p>2021.07.29. 13:41</p>
        </li>
        <li>
          <i className="xi-microphone icon" />
          <h3>녹음된 목록 2</h3>
          <p>2021.07.28. 13:41</p>
        </li>
        <li>
          <i className="xi-microphone icon" />
          <h3>녹음된 목록 1</h3>
          <p>2021.07.27. 13:41</p>
        </li>
      </ul>
    </div>
  );
}

export default RecodedList;

import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import network, { user } from "global/store/store";
import { getCookie } from "global/store/cookie";
import axios from "axios";
import logOnlyDevelopment from "../../../global/log/log";

function EditProfile(props) {
  const email = user.email;
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [render, setRender] = useState(false);

  useEffect(async () => {
    const flag = await user.verifyLogin();
    if (flag) setRender(true);
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const ageChange = (e) => {
    setAge(e.target.value);
  };

  const updateUser = () => {
    axios({
      method: "patch",
      url: `${network.baseURL}users`,
      headers: { "ACCESS-TOKEN": getCookie("jwt") },
      data: {
        name: name,
        age: age,
        gender: "M",
        purposeOfUse: "???",
      },
    })
      .then((res) => {
        if (res.data.success) {
          logOnlyDevelopment("user update success");
          props.history.push("/");
        } else logOnlyDevelopment("user update fail");
      })
      .catch((err) => {
        logOnlyDevelopment("user update fail");
        logOnlyDevelopment(err);
      });
  };

  return (
    <div className="edit-profile">
      <div className="flex-left">
        <h1>My Profile</h1>
        <div className="my-email">
          <span>
            <i className="xi-at" />
          </span>
          <p>{email}</p>
        </div>
        <div className="input">
          <span>
            <i className="xi-user-o" />
          </span>
          <input
            type="text"
            value={name}
            placeholder="닉네임"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <span>
            <i className="xi-user" />
          </span>
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={ageChange}
          />
        </div>
        <div className="sex-container">
          <div className="sex-component">
            <input
              type="radio"
              value="male"
              name="sex"
              className="sex-component"
            />
            <label htmlFor="">Male</label>
          </div>
          <div className="sex-component">
            <input
              type="radio"
              value="female"
              name="sex"
              className="sex-component"
            />
            <label htmlFor="">Female</label>
          </div>
        </div>
        <button type="submit" className="btn-submit" onClick={updateUser}>
          Submit
        </button>
        <p className="or">or</p>
        <button id="resign">탈퇴하기</button>
      </div>
    </div>
  );
}

export default EditProfile;

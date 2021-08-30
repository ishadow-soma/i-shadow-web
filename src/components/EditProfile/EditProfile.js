import React, {useState} from "react";
import "./EditProfile.css";
import http, {user} from "global/store/store";
import {getCookie} from "../../global/store/cookie";
import axios from "axios";

function EditProfile(props) {
  const email = user.email;
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const ageChange = (e) => {
    setAge(e.target.value);
  }

  const updateUser = () => {
    axios({
      method: "patch",
      url: `${http.baseURL}users`,
      headers: {"ACCESS-TOKEN": getCookie("jwt")},
      body: {
        "name": name,
        "age": age,
        "gender": "남성",
        "purposeOfUse": "???"
      }
    }).then(res => {

      if(res.data.success) {
        console.log("user update success");
        props.history.push("/");
      }
      else
        console.log("user update fail");
    }).catch(err => {
      console.log("user update fail");
      console.log(err);
    })
  }

  return (
    <div className="edit-profile">
      <div className="flex-left">
        <h1>My Profile</h1>
        <div className="my-email">
          <span><i className="xi-at"/></span>
          <p>{email}</p>
        </div>
        <div className="input">
          <span><i className="xi-user-o"/></span>
          <input type="text" value={name} placeholder="닉네임" onChange={handleChange}/>
        </div>
        <div className="input">
          <span><i className="xi-user"/></span>
          <input type="text" placeholder="Age" value={age} onChange={ageChange}/>
        </div>
        <div className="sex-container">
          <div className="sex-component">
            <input type="radio" value="male" name="sex" className="sex-component"/>
            <label htmlFor="">Male</label>
          </div>
          <div className="sex-component">
            <input type="radio" value="female" name="sex" className="sex-component"/>
            <label htmlFor="">Female</label>
          </div>
        </div>
        <button type="submit" className="btn-submit" onClick={updateUser}>Submit</button>
        <p className="or">or</p>
        <button id="resign">탈퇴하기</button>
      </div>

      <div className="flex-right">
        <span className="member"/>
        <div>
          <h2>Welcome back to <br/>
            i-Shadow.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eligendi ex magnam minima perferendis quisquam ratione, sunt totam?</p>
        </div>
      </div>
    </div>
  )
}

export default EditProfile;
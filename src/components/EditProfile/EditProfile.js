import React from "react";
import "./EditProfile.css";
import store from "../../global/store/store";

function EditProfile() {
  const email = store.email;

  return (
    <div className="edit-profile">
      <div className="flex-left">
        <h1>My Profile</h1>
        <p className="my-email">{email}</p>
        <form action="">
          <input type="text" value={email}/>
          <input type="text" placeholder="Age"/>
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
          <button type="submit" className="btn-submit">Submit</button>
        </form>
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
import React, { useState, useEffect } from "react";
import { withAuth } from "../lib/AuthProvider";
import logo from "../img/user-solid.svg";
import axios from "axios";
import service from "../api/service";

const Profile = (props) => {
  const [finalUser, setUserInput] = useState({});
  let onChangeName = e => {
    finalUser.name = e.target.value
}
let onChangelastName = e => {
    finalUser.lastName = e.target.value
}
  let fileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgPath", e.target.files[0]);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/upload",
        formData
      );
     finalUser.imgPath = res.data.secure_url;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect( () => {
    const fetchData = async () => {
      const finalUser =  await service.getUserInfo()    
      setUserInput(finalUser)
      console.log(finalUser, "finaaaaaal")
    }
    fetchData()
      },[]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(finalUser)
    await service.profileUpdate(finalUser);
    props.history.push("/private/profile");
    console.log("Edited!");
  };
  

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <div className="col text-center pb-3">
            <p htmlFor="idProfileImg">Edit profile image</p>
            <img
              className="navIcons"
              src={finalUser.imgPath ? finalUser.imgPath : logo}
              alt=""
            />
          </div>

          <input
            type="file"
            required
            className="form-control"
            id="idProfileImg"
            name="imgPath"
            aria-describedby="image"
            placeholder={finalUser.imgPath}
            onChange={(e) => fileUpload(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idName">Name</label>
          <input
            required
            className="form-control"
            id="idName"
            aria-describedby="Name"
            placeholder={finalUser.name}
            type="text"
            name="name"
            defaultValue={finalUser.name || ""}
            onChange={onChangeName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idName">Lastname</label>
          <input
            required
            className="form-control"
            id="idLastName"
            aria-describedby="Lastname"
            placeholder={finalUser.lastName}
            type="text"
            name="lastName"
            defaultValue={finalUser.lastName || ""}
            onChange={onChangelastName}
          />
        </div>

        <div className="text-center">
          <button className="btn btnBlue" type="submit">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(Profile);

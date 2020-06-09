import React, { useState, useEffect } from "react";
import { withAuth } from "../lib/AuthProvider";
import logo from "../img/user-solid.svg";
import axios from "axios";
import service from "../api/service";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import {
  TextField,
  ThemeProvider,
  createMuiTheme,
  Button,
} from "@material-ui/core";

const blueSwapit = createMuiTheme({
  palette: {
    primary: {
      main: "#006f9b",
    },
  },
});

const EditProfile = (props) => {
  const [finalUser, setUserInput] = useState({
    name: props.user.name,
    lastName: props.user.lastName,
    imgPath: props.user.imgPath,
  });
  const [userUpdated, setUserUpdated] = useState({});

  let onChangeName = (e) => {
    finalUser.name = e.target.value;
  };
  let onChangelastName = (e) => {
    finalUser.lastName = e.target.value;
  };
  let fileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgPath", e.target.files[0]);
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URI + "/api/upload",
        formData
      );
      finalUser.imgPath = res.data.secure_url;
    } catch (err) {
      console.log(err);
    }
  };
  let updatedUser = async () => {
    const userUpdated = await service.getUserInfo();
    setUserUpdated(userUpdated);
  };

  useEffect(() => {
    const fetchData = async () => {
      const finalUser = await service.getUserInfo();
      setUserInput(finalUser);
    };
    updatedUser();
    fetchData();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    await service.profileUpdate(finalUser);
    console.log("Edited!");
  };

  let closeModal = () => {
    props.changeEd();
    props.closeEd();
  }

  return (
    <div className="wrapper-registration" style={{ position: "relative" }}>
      <CloseRoundedIcon
        onClick={props.closeEd}
        style={{ position: "absolute", left: 10, top: 10 }}
      />
      <form className="text-center" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="mb-4">Edit profile</h2>
        <div style={{ position: "relative" }}>
          <img
            className="editImg"
            src={finalUser.imgPath ? finalUser.imgPath : logo}
            alt=""
            onChange={props.changeEd}
          />
          <input
            accept="image/*"
            name="imgPath"
            style={{ display: "none" }}
            id="idProfileImg"
            multiple
            required
            className="edit-photo-button"
            // placeholder={finalUser.imgPath}
            onChange={(e) => fileUpload(e)}
            type="file"
          />
          <label htmlFor="idProfileImg">
            <Button
              variant="raised"
              className="absolute-edit-photo"
              component={CreateRoundedIcon}
            />
          </label>
        </div>
        <ThemeProvider theme={blueSwapit}>
          <div>
            <TextField
              className="input-form"
              id="idName"
              name="name"
              type="text"
              variant="outlined"
              label="Name"
              placeholder={userUpdated.name}
              defaultValue={userUpdated.name || ""}
              onChange={onChangeName}
            ></TextField>
          </div>
          <div>
            <TextField
              className="input-form"
              id="idLastName"
              name="lastName"
              type="text"
              variant="outlined"
              label="Lastname"
              placeholder={userUpdated.lastName}
              defaultValue={userUpdated.lastName || ""}
              onChange={onChangelastName}
            ></TextField>
          </div>
          <button
            className="btn-blueSwapit mt-4"
            type="submit"
            onClick={closeModal}
          >
            {props.changeEd === true ? "Close" : "Save"}
          </button>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default withAuth(EditProfile);

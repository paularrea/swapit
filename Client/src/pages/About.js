import React from "react";
import { Avatar } from "@material-ui/core";
import logoSwapit from "../img/logo_swapit.png";
const About = (props) => {
  return (
    <div className="wrapper-registration mb-3">
      <Avatar
        style={{ margin: "0 auto", width: "60px", height: "70px" }}
        src={logoSwapit}
      />
      <p className="text-left p-2 m-2 my-3">
        This MERN stack fully responsive web app is designed for creative minds
        and craftsmen who want to exchange its own creations with others. <br />{" "}
        <br />
        Users can upload, edit and delete photos of its creations, search other
        porducts by filtered categories, chat and swap creations if both agree.
        <br /> <br /> Developed by <b>Pau Larrea</b> and <b>Albert Quiñonero</b>
        , to achieve better practices and understanding of React Hooks and
        socket.io
      </p>
      <div className="text-center">
        <button className="btn-blueSwapit" onClick={props.closeA}>
          Close
        </button>
      </div>
    </div>
  );
};

export default About;

import React from "react";
import { Avatar } from "@material-ui/core";
import albertImg from "../img/albertProfile.png";
import pauImg from "../img/pauImg.png";
import logoSwapit from "../img/logo_swapit.png";
const About = (props) => {
  return (
    <div className="wrapper-registration2">
      <Avatar
        style={{ margin: "0 auto", width: "60px", height: "70px" }}
        src={logoSwapit}
      />
      <h2 className="text-center">About</h2>
      <div className="d-flex flex-row justify-content-center">
        <Avatar className="mr-2" src={albertImg}></Avatar>
        <Avatar className="ml-2" src={pauImg}></Avatar>
      </div>

      <p className="text-justify p-2 m-2">
        We are <b>Pau Larrea</b>  and <b>Albert Quiñonero</b>, we have made this app for
        practice <b>React Hooks, Socket.io, Nodejs, Express, Bootstrap</b>  .....
      </p>
      <div className="text-center">
        <button className="btn btn-secondary" onClick={props.closeA} >Close</button>
      </div>
    </div>
  );
};

export default About;

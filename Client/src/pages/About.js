import React from "react";
import { Avatar } from "@material-ui/core";
import albertImg from "../img/albertProfile.png";
import pauImg from "../img/pauImg.png";
import logoSwapit from "../img/logo_swapit.png";
const About = (props) => {
  return (
    <div className="wrapper-registration2 mb-3">
      <Avatar
        style={{ margin: "0 auto", width: "60px", height: "70px" }}
        src={logoSwapit}
      />
      {/* <h2 className="text-center my-4">About</h2>
      <div className="d-flex flex-row justify-content-center">
        <Avatar className="mr-2" src={albertImg}></Avatar>
        <Avatar className="ml-2" src={pauImg}></Avatar>
      </div> */}

      <p className="text-justify p-2 m-2 my-3">
        This MERN stack web application designed for creatives and craftsmen who want to exchange its own creations with others. Users can upload creations, like other's and chat if there is a match of likes between them.  
       Developed by <b>Pau Larrea</b> and <b>Albert Quiñonero</b>, to achieve better practices and understanding of 
        React Hooks.
      </p>
      <div className="text-center">
        <button className="btn-blueSwapit" onClick={props.closeA} >Close</button>
      </div>
    </div>
  );
};

export default About;

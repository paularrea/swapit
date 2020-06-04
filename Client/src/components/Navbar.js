import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";
import { Spinner } from "react-bootstrap";
import Notifications from "../pages/Notifications";
import ChatButton from "../pages/ChatButton";
import { Avatar } from "@material-ui/core";
import logoSwapit from "../img/logo_swapit.png";

const Navbar = (props) => {
  const [userUpdated, setUserUpdated] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const finalUser = await service.getUserInfo();
      setUserUpdated(finalUser);
    };

    fetchData();
  }, []);
  return (
    <div className="row d-flex justify-content-between align-items-center navbar">
      <div className="">
        <Link to={"/private"} id="swapit-btn">
          <div className="d-flex align-items-center">
            <Avatar
              style={{ width: "60px", height: "70px" }}
              src={logoSwapit}
            />
            <h2 className="ml-2" style={{ color: "#006f9b" }}>
              swap it!
            </h2>
          </div>
        </Link>
      </div>
      <div className="d-flex justify-content-end">
        <ChatButton />
        <Notifications />
        <Link to={"/private/profile"} id="profile-btn" >
          {userUpdated.imgPath === undefined ? (
            <Spinner animation="border" variant="info" />
          ) : (
            <div className="hoverNavbarIcons">
            <img
              className="profileImgNav "
              src={userUpdated.imgPath}
              alt="Profile"
            /></div>
          )}
        </Link>
      </div>
    </div>
  );
};
export default withAuth(Navbar);

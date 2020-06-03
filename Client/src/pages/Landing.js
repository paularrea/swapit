import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoSwapit from "../img/logo_swapit.png";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import Signup from "./Signup";
import { Avatar } from "@material-ui/core";
import Onboarding from "../components/Onboarding";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Layout = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const openL = () => {
    setOpenLogin(!openLogin);
  };

  const closeL = () => {
    setOpenLogin(!openLogin);
  };

  const openS = () => {
    setOpenSignup(!openSignup);
  };

  const closeS = () => {
    setOpenSignup(!openSignup);
  };
  return (
    <div>
      <div className="header-layout mx-5 my-2">
        <div className="d-flex align-items-center">
          <Avatar style={{ width: "60px", height: "70px" }} src={logoSwapit} />
          <h2 className="ml-2" style={{ color: "#006f9b" }}>
            swap it!
          </h2>
        </div>

        <div className="d-flex justify-content-around">
          <Link to="/about" className="mr-2">
            <button className="btn-about">
              <b>about</b>
            </button>
          </Link>

          <button className="btn-blueSwapit mr-2" onClick={openL}>
            <b>Log in</b>
          </button>
          <Modal
            open={openLogin}
            onClose={closeL}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Login />
          </Modal>

          <button className="btn-signup-header mr-2" onClick={openS}>
            <b>Sign up</b>
          </button>
          <Modal
            open={openSignup}
            onClose={closeS}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Signup />
          </Modal>
        </div>
      </div>
      <Onboarding />
    </div>
  );
};

export default Layout;

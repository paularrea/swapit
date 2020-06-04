import React, { useState } from "react";

import logoSwapit from "../img/logo_swapit.png";
import Modal from "@material-ui/core/Modal";
import Login from "./Login";
import Signup from "./Signup";
import { Avatar } from "@material-ui/core";
import Onboarding from "../components/Onboarding";
import About from "./About";

const Layout = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  const openL = () => {
    setOpenLogin(!openLogin);
  };
  const openA = () => {
    setOpenAbout(!openAbout);
  };
  const closeA = () => {
    setOpenAbout(!openAbout);
  };

  const closeL = () => {
    setOpenLogin(!openLogin);
  };

  const openS = () => {
    setOpenSignup(!openSignup);
  };
  const openLogLink = () => {
    setOpenSignup(!openSignup);
    setOpenLogin(!openLogin);
  };
  const openSignLink = () => {
    setOpenLogin(!openLogin);
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
          <button className="btn-signup-header mr-2" onClick={openA}>
            <b>About</b>
          </button>
          <Modal
            open={openAbout}
            onClose={closeA}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <About closeA={closeA} />
          </Modal>

          <button className="btn-blueSwapit mr-2" onClick={openL}>
            <b>Log in</b>
          </button>
          <Modal
            open={openLogin}
            onClose={closeL}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Login openS={openSignLink} />
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
            <Signup openL={openLogLink} />
          </Modal>
        </div>
      </div>
      <Onboarding />
    </div>
  );
};

export default Layout;

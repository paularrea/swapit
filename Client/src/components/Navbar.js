import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoutLogo from "../img/sign-out-alt-solid.svg";
import discoverLogo from "../img/globe-africa-solid.svg"; 
import notiLogo from "../img/telegram-plane-brands.svg";
import profileLogo from "../img/user-solid1.svg";

import { withAuth } from "../lib/AuthProvider"; //	<-- UPDATE HERE

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      button: !this.state.button,
    });
  }
  render() {
    const { logout } = this.props;
    return (
      <div className="row d-flex justify-content-between align-items-center bg-dark navbar">
        <Link to={"/private"}  id="discover-btn">
          <img className="navIcons" src={discoverLogo} alt="Discover" />
        </Link>
        <Link to={"/private/notifications"} id="notifications-btn">
          <img className="navIcons" src={notiLogo} alt="Notifications" />
        </Link>
        <Link to={"/private"} id="swapit-btn">
          <h1 className ="text-light">Swap it!</h1>
        </Link>
        <Link to={"/private/profile"}  id="profile-btn">
          <img className="navIcons" src={profileLogo} alt="Profile" />
        </Link>
        <Link to={"/"} onClick={logout} id="home-btn">
          <img className="navIcons" src={logoutLogo} alt="Logout" />
        </Link>
      </div>
    );
  }
}
export default withAuth(Navbar);

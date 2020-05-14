import React, { Component } from "react";
import { Link } from "react-router-dom";
import notiLogo from "../img/telegram-plane-brands.svg";
import { withAuth } from "../lib/AuthProvider";

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
    return (
      <div className="row d-flex justify-content-between align-items-center navbar">
        <div className=''>
          <Link to={"/private"} id="swapit-btn">
            <h1 className="text-dark">Swap it!</h1>
          </Link>
        </div>
        <div className="d-flex justify-content-end">
          <Link to={"/private/notifications"} id="notifications-btn">
            <img className="navIcons mx-2" src={notiLogo} alt="Notifications" />
          </Link>
          <Link to={"/private/profile"} id="profile-btn">
            <img
              className="profileImgNav mx-3"
              src={this.props.user.imgPath}
              alt="Profile"
            />
          </Link>
        </div>
      </div>
    );
  }
}
export default withAuth(Navbar);

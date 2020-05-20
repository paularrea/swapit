import React, { useState } from "react";
import { Link } from "react-router-dom";
import notiLogo from "../img/telegram-plane-brands.svg";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";

const Navbar = (props)=> {
  
  const [userUpdated, setUserUpdated] = useState({})   
 
 let updatedUser = async () => {
    const userUpdated = await service.getUserInfo()
    setUserUpdated(userUpdated)
    
   }
   updatedUser()
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
              src={userUpdated.imgPath}
              alt="Profile"
            />
          </Link>
        </div>
      </div>
    );
  
}
export default withAuth(Navbar);

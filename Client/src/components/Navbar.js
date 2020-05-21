import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import notiLogo from "../img/telegram-plane-brands.svg";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";
import { Spinner } from "react-bootstrap";
import Notifications from "../pages/Notifications";

const Navbar = (props)=> {
  
  const [userUpdated, setUserUpdated] = useState({})   
 

   useEffect(() => {
    const fetchData = async () => {
      const finalUser = await service.getUserInfo();
      setUserUpdated(finalUser);
    };
    
    fetchData();
  }, []);
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
          <Notifications>
          
        
      
          </Notifications>
          <Link to={"/private/profile"} id="profile-btn">
            {userUpdated.imgPath === undefined ? <Spinner animation="border" variant="info" /> : <img
              className="profileImgNav mx-3"
              src={userUpdated.imgPath}
              alt="Profile"
            />}
          </Link>
        </div>
      </div>
    );
  
}
export default withAuth(Navbar);

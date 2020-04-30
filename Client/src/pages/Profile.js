import React, { useState, useEffect } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
const Profile = () => {
  const [finalUser, setUserData] = useState({});
  useEffect( () => {
    const fetchData = async () => {
      const UserfromDB =  await service.getUserInfo()    
      setUserData(UserfromDB)
    }
    fetchData()
      },[]);
  
  return (
    <div>
      
      <h1>
        <b>Profile!</b>
      </h1>
      <img className="profileImg" src={finalUser.imgPath} alt="perfil"/>
      <p>
        {" "}
        Hi! <b>{finalUser.username}</b>
      </p>
      <p>
        {" "}
        Name: <b>{finalUser.name}</b>{" "}
      </p>
      <p>
        {" "}
        Lastname: <b>{finalUser.lastName}</b>
      </p>
      
      
      <Link className="btn btn-primary" to ="/private/edit-profile" >Edit Profile</Link>
    </div>
  );
};

export default withAuth(Profile);

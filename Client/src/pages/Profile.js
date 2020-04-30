import React, { useState, useEffect } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

const Profile = () => {
  const [finalUser, setUserData] = useState({});
  const [myCreations, setMyCreations] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const UserfromDB = await service.getUserInfo();
      const creations = await service.getMyProducts();
      setUserData(UserfromDB);
      setMyCreations(creations);
    };
    fetchData();
  }, []);

  const displayMyCreations = myCreations ? (
    myCreations.haveList.map((creation) => {
      return (
        <div key={creation._id} className="col myCreationsProfile">
          <img src={creation.imgPath} alt="" />
          <h5>{creation.title}</h5>
        </div>
      );
    })
  ) : (
    <div></div>
  );

  return (
    <div>
      <Link className="btn btn-primary" to="/private/edit-profile">
        Edit Profile
      </Link>
      <div className="row d-flex align-items-center mt-3">
        <div className="col">
          <img className="profileImg" src={finalUser.imgPath} alt="perfil" />
        </div>
        <div className="col">
          <h5>
            <b>
              {finalUser.name} {finalUser.lastName}
            </b>
          </h5>
        </div>
      </div>
      <Link className="btn addCreation-btn m-3" to="/private/creation-form">
        Upload Creation
      </Link>
      <div className="row">{displayMyCreations}</div>
    </div>
  );
};

export default withAuth(Profile);

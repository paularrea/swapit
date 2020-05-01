import React, { useState, useEffect } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

const Profile = () => {
  const [finalUser, setUserData] = useState({});
  const [myCreations, setMyCreations] = useState();
  const [havesBtn, setBtnHaves] = useState(false);
  const [wantsBtn, setBtnWants] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const UserfromDB = await service.getUserInfo();
      const creations = await service.getMyProducts();
      setUserData(UserfromDB);
      setMyCreations(creations);
    };
    fetchData();
  }, []);

  const displayHaveList = myCreations ? (
    myCreations.haveList.map((creation) => {
      return (
        <Link to={`/private/product-details/${creation._id}`}>
        <div key={creation._id} className="col haveListCard">
          <img src={creation.imgPath} alt="" />
          <p>{creation.title}</p>
        </div>
        </Link>
      );
    })
  ) : (
    <div></div>
  );

  const displayWantList = myCreations ? (
    myCreations.wantList.map((wantedCreations) => {
      return (
        <Link to={`/private/product-details/${wantedCreations._id}`}>
        <div key={wantedCreations._id} className="col haveListCard">
          <img src={wantedCreations.imgPath} alt="" />
          <p>{wantedCreations.title}</p>
        </div>
        </Link>
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
      <Link className="btn addCreation-btn m-4" to="/private/creation-form">
        Upload Creation
      </Link>
      <div>
      <div className="row btn-group">
        <div className="col">
          <button
            onClick={() => {
              setBtnWants(false);
              setBtnHaves(true);
            }}
            className={havesBtn === true ? "btn btn-primary" : "btn btn-dark"}
          >
            My Creations
          </button>
        </div>
        <div className="col">
          <button
            onClick={() => {
              setBtnWants(true);
              setBtnHaves(false);
            }}
            className={wantsBtn === true ? "btn btn-primary" : "btn btn-dark"}
          >
            Wanted Creations
          </button>
        </div>
      </div>
      </div>
      <div>
        <div
          id="haveList"
          className="row haveList d-flex justify-content-center"
        >
          {havesBtn ? displayHaveList : <span></span>}
        </div>
        <div
          id="wantList"
          className="row wantList d-flex justify-content-center"
        >
          {wantsBtn ? displayWantList : <span></span>}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profile);

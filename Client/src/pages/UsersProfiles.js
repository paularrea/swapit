import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersProfiles = (props) => {
  const [userProfile, setUserProfile] = useState();
  const { params } = props.match;
  let profileId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const InfofromDB = await axios.get(
        `http://localhost:4000/api/user-profile/${profileId}`
      );
      setUserProfile(InfofromDB.data);
    };
    fetchData();
  }, [profileId]);

  console.log(userProfile, "info");

  return (
    <div>
      <img
        className="creatorImage"
        src={userProfile !== undefined && userProfile.imgPath}
        alt=""
      />
      <h3>
        {userProfile !== undefined && userProfile.name}{" "}
        {userProfile !== undefined && userProfile.lastName}
      </h3>
      <div>
        {userProfile !== undefined &&
          userProfile.haveList.map((product) => {
            return (
              <div className="card-columns">
                <div className="card creationsCard ">
                  <Link
                    key={product._id}
                    to={`/private/product-details/${product._id}`}
                  >
                    <img
                      className="card-img-top imgCard"
                      src={product.imgPath}
                      alt="Card image cap"
                    />{" "}
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">
                      <small className="text-muted">{product.category}</small>
                    </p>
                    <p className="card-text text-left descriptionCard">{product.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UsersProfiles;

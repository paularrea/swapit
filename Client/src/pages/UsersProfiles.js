import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Masonry from "react-masonry-css";
import { Spinner } from "react-bootstrap";

const UsersProfiles = (props) => {
  const [userProfile, setUserProfile] = useState();
  const { params } = props.match;
  let profileId = params.id;

  let breakpointColumnsObj = {
    default: 4,
    1100: 4,
    900: 3,
    600: 2,
    400: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      const InfofromDB = await axios.get(
        process.env.REACT_APP_API_URI + `/api/user-profile/${profileId}`
      );
      setUserProfile(InfofromDB.data);
    };
    fetchData();
  }, [profileId]);

  const getBackgroundColor = (category) => {
    if (category === "photography") {
      return { backgroundColor: "rgba(224, 214, 138, .8)" };
    }
    if (category === "wood") {
      return { backgroundColor: "rgba(81, 23, 48, .8)", color: "white" };
    }
    if (category === "decoration") {
      return { backgroundColor: "rgba(203, 145, 115, .8)" };
    }
    if (category === "textile") {
      return { backgroundColor: "rgba(142, 68, 61, .8)", color: "white" };
    }
    if (category === "drawings") {
      return { backgroundColor: "rgba(66, 21, 55, .8)", color: "white" };
    }
    return "black";
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Navbar />
      </div>
      <img
        className="creatorImage"
        src={
          userProfile === undefined ? (
            <Spinner animation="border" variant="info" />
          ) : (
            userProfile.imgPath
          )
        }
        alt=""
      />
      <h3>
        {userProfile !== undefined && userProfile.name}{" "}
        {userProfile !== undefined && userProfile.lastName}
      </h3>

      <div className="containerUserProfile">
        <p>
          <b>
            See All {userProfile !== undefined && userProfile.name}'s Creations
            ({userProfile !== undefined && userProfile.haveList.length})
          </b>
        </p>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {userProfile !== undefined &&
            userProfile.haveList.map((product) => {
              return (
                <div
                  key={product._id}
                  className="usersProductCards mt-3"
                  style={getBackgroundColor(product.category)}
                >
                  <Link to={`/private/product-details/${product._id}`}>
                    <img
                      className="usersProdImg"
                      src={product.imgPath}
                      alt="cardImg"
                    />{" "}
                  </Link>
                  <div className="card-body">
                    <p>{product.title}</p>
                    <p className="card-text">
                      <small className="">{product.category}</small>
                    </p>
                    <p className="descriptionCard">{product.description}</p>
                  </div>
                </div>
              );
            })}
        </Masonry>
      </div>
    </div>
  );
};

export default UsersProfiles;

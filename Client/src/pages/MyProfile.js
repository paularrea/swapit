import React, { useState, useEffect } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import Masonry from "react-masonry-css";
import InterestedUsers from "../components/InterestedUsers";
import EditProfile from '../components/EditProfile'
import Modal from "@material-ui/core/Modal";
import { Spinner } from "react-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


const Profile = (props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [finalUser, setUserData] = useState({});
  const [myCreations, setMyCreations] = useState();
  const { logout } = props;

  const openEd = () => {
    setOpenEdit(!openEdit);
  };
  const closeEd = () => {
    setOpenEdit(!openEdit);
  };

  let breakpointColumnsObj = {
    default: 5,
    1100: 5,
    750: 3,
    500: 1,
  };
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

  useEffect(() => {
    const fetchData = async () => {
      const UserfromDB = await service.getUserInfo();
      const creations = await service.getMyProducts();
      setUserData(UserfromDB);
      setMyCreations(creations[0]);
    };
    fetchData();
  }, [openEdit]);

  const displayHaveList =
    myCreations !== undefined &&
    myCreations.haveList.map((creation) => {
      return (
        <div
          key={creation._id}
          className="usersProductCards mt-3"
          style={getBackgroundColor(creation.category)}
        >
          <div className="col haveListCard position-relative">
            <Link to={`/private/product-details/${creation._id}`}>
              <img
                className="position-relative creationsImg"
                src={creation.imgPath}
                alt=""
              />
            </Link>
            <Link
              className="position-absolute deleteProd"
              to={`/private/product-delete/${creation._id}`}
            >
              <div className="bgDeleteProduct">
                <DeleteIcon style={{ color: "white" }} />
              </div>
            </Link>
            <div>
              <p className="text-left">{creation.title}</p>
            </div>

            <div className="d-flex align-items-center justify-content-end">
              <p className="numUsers text-white text-right ">
                {creation.interestedUser.length &&
                  creation.interestedUser.length}{" "}
              </p>
              <InterestedUsers creation={creation} />
            </div>
          </div>
        </div>
      );
    });

  const displayWantList =
    myCreations !== undefined &&
    myCreations.wantList.map((wantedCreations) => {
      return (
        <div
          key={wantedCreations._id}
          className="usersProductCards mt-3"
          style={getBackgroundColor(wantedCreations.category)}
        >
          <div className="col haveListCard">
            <Link to={`/private/product-details/${wantedCreations._id}`}>
              <img
                className="creationsImg"
                src={wantedCreations.imgPath}
                alt=""
              />
            </Link>
            <p>{wantedCreations.title}</p>
          </div>
        </div>
      );
    });

  return (
    <div className="container">
      <div className="d-flex mt-3">
        <Link to="/private">
          <div className="hoverNavbarIcons d-flex justify-content-center align-items-center">
            <ArrowBackIosRoundedIcon
              className="logOutIcon text-dark"
              alt="backlogo"
            />
          </div>
        </Link>
        <div className="logandedit">

        <button className="m-3 sizeEdit" onClick={openEd}>
            <b>Edit</b>
          </button>
        <Modal
            open={openEdit}
            onClose={closeEd}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <EditProfile changeEd={setOpenEdit} closeEd={closeEd}/>
          </Modal>

          <Link to={"/"} onClick={logout} id="home-btn">
            <div className="hoverNavbarIcons d-flex justify-content-center align-items-center">
              <ExitToAppIcon className="logOutIcon text-dark" />
            </div>
          </Link>
        </div>
      </div>
      {finalUser.imgPath === undefined ? (
        <Spinner animation="border" variant="info" />
      ) : (
        <div className=" d-flex text-left align-items-center justify-content-center mt-3">
          <div className="">
            <img
              className="profileImg"
              alt="perfilImg"
              src={finalUser.imgPath}
            />
          </div>
        </div>
      )}
      <div className="mt-3 ">
        <p className="styleNameAndLastname">
          <b>
            {finalUser.name} {finalUser.lastName}
          </b>
        </p>
      </div>
      <Link className="btn addCreation-btn m-3" to="/private/creation-form">
        Upload Creation
      </Link>
      <div className="containerUserProfile ">
        <div id="haveList" className="px-3">
          <p>
            My Wishes... (
            {myCreations !== undefined && myCreations.wantList.length})
          </p>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {myCreations === undefined ? (
              <Spinner animation="border" variant="info" />
            ) : (
              displayWantList
            )}
          </Masonry>
        </div>
      </div>
      <div className="containerUserProfile">
        <div id="wantList" className="px-3">
          <p>
            Own Creations... (
            {myCreations !== undefined && myCreations.haveList.length})
          </p>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {myCreations === undefined ? (
              <Spinner animation="border" variant="info" />
            ) : (
              displayHaveList
            )}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profile);

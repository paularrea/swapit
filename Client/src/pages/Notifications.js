import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotiCounter from "../components/NotiCounter";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";

const Notifications = (props) => {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState();
  const handleClose = () => setShow(false);

  useEffect(() => {
    const fetchData = async () => {
      let notiInfo = await axios.post(
        process.env.REACT_APP_API_URI + "/api/notifications",
        props.user
      );
      setNotifications(notiInfo.data[0].likeList.reverse());
    };
    fetchData();
  }, [props.user]);

  const handleShow = () => {
    setShow(true);
    notifications !== undefined &&
      notifications.map((notification) => {
        return (notification.viewed = true);
      });
    axios.put(process.env.REACT_APP_API_URI + "/api/notifications", {
      notifications,
      _id: props.user._id,
    });
  };

  const notis =
    notifications !== undefined &&
    notifications.map((notification) => {
      return (
        <Link
          key={notification._id}
          className="modalUsers d-flex align-items-center justify-content-between my-2 p-2"
          to={`/private/user-profile/${notification.userWhoLikes._id}`}
        >
          <img
            className="userImg"
            src={notification.userWhoLikes.imgPath}
            alt=""
          />
          <h5 className="pl-3">
            <b>
              {notification.userWhoLikes.name}{" "}
              {notification.userWhoLikes.lastName}
            </b>{" "}
            Liked your product
          </h5>

          <img
            className="productImg"
            src={notification.productLiked.imgPath}
            alt=""
          />
        </Link>
      );
    });

  return (
    <>
      <div className="hoverNavbarIcons position-relative " onClick={handleShow}>
        <FavoriteBorderRoundedIcon className='position-relative' style={{ fontSize: 35, color: "black" }} />
        {notifications !== undefined && (
          <NotiCounter className='notiAbsolute'  notifications={notifications} />
        )}
      </div>
      <Modal className='modal-style' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Your creation's likes</Modal.Title>
        </Modal.Header>
        <Modal.Body>{notis.length === 0 ? <p>Still no likes at any of your creations. <br/><br/> Users will start appearing if they like one of your products. By clicking them you will have access to their profiles</p> : notis}</Modal.Body>
        <Modal.Footer>
          <button className="btn-blueSwapit" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withAuth(Notifications);

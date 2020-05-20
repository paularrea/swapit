import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

const InterestedUsers = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const usersList = props.creation.interestedUser.map((user) => {
    return (
      <Link
        className="modalUsers d-flex align-items-center my-2 p-2"
        to={`/private/user-profile/${user._id}`}
      >
        <img src={user.imgPath} alt="" />
        <h5 className="pl-3">
          {user.name} {user.lastName}
        </h5>
      </Link>
    );
  });
  return (
    <>
      <button className="btnHeartProfile" onClick={handleShow}>
        <div className="heartProfile">
          <FavoriteBorderRoundedIcon  style={{ color: 'white' }} />
        </div>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Interested Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.creation.interestedUser.length === 0 ? (
            <p>Anybody interested yet ...</p>
          ) : (
            usersList
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InterestedUsers;

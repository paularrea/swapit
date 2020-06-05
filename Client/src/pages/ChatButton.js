import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";

import { Avatar } from "@material-ui/core";

const ChatButton = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [allusers, setAllUsers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const InfofromDB = await axios.get(
        process.env.REACT_APP_API_URI + `/api/users`
      );
      setAllUsers(InfofromDB.data);
    };
    fetchData();
  }, []);
  const handleShow = () => {
    setShow(true);
  };

  let chats = [];
  allusers !== undefined &&
    allusers.map((client) => {
      return client.wantList.map((wantClientProduct) => {
        return props.user.haveList.map((haveProduct) => {
          return client.haveList.map((haveClientProduct) => {
            return props.user.wantList.map((wantProduct) => {
              if (chats.length > 0) {
                chats.map((user) => user._id === client._id);
              } else if (
                haveProduct === wantClientProduct &&
                wantProduct === haveClientProduct
              ) {
                return chats.push(client);
              }
              return chats;
            });
          });
        });
      });
    });

  let showChats =
    chats.length > 0 &&
    chats.map((client) => {
      return (
        <div key={client._id}>
          <Link
            className="modalUsers d-flex align-items-center justify-content-between my-2 p-2"
            to={`/private/chat/${client._id}`}
          >
            <Avatar alt="Remy Sharp" src={client.imgPath} />

            <h3 className="pl-3 text-dark">
              <b>
                {client.name} {client.lastName}
              </b>
            </h3>
          </Link>
        </div>
      );
    });
  return (
    <>
      <div className="hoverNavbarIcons" onClick={handleShow}>
        <ChatBubbleOutlineRoundedIcon
          style={{ fontSize: 35, color: "black" }}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Chats</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showChats}</Modal.Body>
        <Modal.Footer>
          <button className="btn-blueSwapit" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withAuth(ChatButton);

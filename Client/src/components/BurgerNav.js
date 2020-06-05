import React, { useEffect, useState } from "react";
import { ToggleLayer, Arrow } from "react-laag";
import Notifications from "../pages/Notifications";
import ChatButton from "../pages/ChatButton";
import { Link } from "react-router-dom";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import service from "../api/service";
import Avatar from "@material-ui/core/Avatar";
import { withAuth } from "../lib/AuthProvider";
import ExitToApp from "@material-ui/icons/ExitToApp"
const BurgerNav = (props) => {
  const [userUpdated, setUserUpdated] = useState({});
  const { logout } = props;
  useEffect(() => {
    const fetchData = async () => {
      const finalUser = await service.getUserInfo();
      setUserUpdated(finalUser);
    };
    fetchData();
  }, []);
  return (
    <ToggleLayer
      renderLayer={({ isOpen, layerProps, arrowStyle, layerSide }) =>
        isOpen && (
          <div
            ref={layerProps.ref}
            className="layer"
            style={{
              ...layerProps.style,
              width: 250,
              height: "auto",
              backgroundColor: "white",
              borderRadius: 15,
            }}
          >
            <div className="p-2 m-2">
              <Link
                className=" d-flex  align-items-center  ItemsBurger py-3 px-2"
                to={"/private/profile"}
                id="profile-btn"
              >
                <Avatar className="mr-2" src={props.user.imgPath} />
                <p className=" noneMargin">
                  {props.user.name} {props.user.lastName}
                </p>
              </Link>

              <hr className="horizontal-line mt-4 " />

              <div className=" d-flex align-items-center justify-content-between mx-2">
               <p className=" noneMargin">Notifications</p>
                <Notifications />{" "}
                
              </div>
              <div className=" d-flex align-items-center justify-content-between mx-2 ">
               <p className=" noneMargin">Chats</p> 
               <ChatButton />
                
              </div>
              <Link className="row d-flex align-items-center  text-dark justify-content-between mx-2 my-2" to={"/"} onClick={logout}>
                <p className=" noneMargin">Log out</p>  
                <ExitToApp  style={{ fontSize: 35, color: "black" }} className="mr-3" fill="grey"/>
                  
                  
              </Link>
            </div>
            <Arrow
              style={arrowStyle}
              layerSide={layerSide}
              backgroundColor="#f5f5f5"
              borderWidth={1}
              borderColor="#d8d6d9"
              size={10}
              roundness={0.7}
            />
          </div>
        )
      }
      placement={{
        anchor: "BOTTOM_RIGHT",

        autoAdjust: true,

        triggerOffset: 10,
      }}
    >
      {({ triggerRef, toggle }) => (
        <MenuRoundedIcon
          ref={triggerRef}
          className="toggle-btn"
          onClick={toggle}
          style ={{fontSize: 35, color: "black"}}
        />
      )}
    </ToggleLayer>
  );
};

export default withAuth(BurgerNav);

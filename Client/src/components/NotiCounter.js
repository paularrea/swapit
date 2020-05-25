import React from "react";

const NotiCounter = (props) => {
  let newArr = [];

  props.notifications !== undefined &&
    props.notifications.map((notification) => {
      return notification.viewed === false && newArr.push(notification.viewed);
    });

  return (
    <div>
      {newArr.length > 0 && (
        <span className="borderNotis">
          <p className="text-light ">{newArr.length}</p>
        </span>
      )}
    </div>
  );
};

export default NotiCounter;

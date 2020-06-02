import React from "react";
import io from "socket.io-client";
import { withAuth } from "../lib/AuthProvider";

// let socketUrl = "/";
export const CTX = React.createContext();

function reducer(state, action) {
  const { from, msg, img, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg, img }],
      };
    default:
      return state;
  }
}
let socket;
function sendChatAction(value) {
  socket.emit("chat message", value);
}

function Store(props) {
 


  let initState = {
    general:[],
    topic2:[]
  };

  const [allChats, dispatch] = React.useReducer(reducer, initState);

  

  if (!socket) {
    // socket = io(socketUrl);
    socket = io(":3001");
    socket.emit('join', {name: props.params});
    
console.log(props.paramsId)
    socket.on("chat message", function (msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }
  
  const userName = props.user.name + " " + props.user.lastName;
  const userImg = props.user.imgPath;
  const userId = props.user._id;

  return (
    <CTX.Provider
      value={{ allChats, sendChatAction, userName, userId, userImg }}
    >
      {props.children}
    </CTX.Provider>
  );
}
export default withAuth(Store);

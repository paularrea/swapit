import React from "react";
import io from "socket.io-client";
import { withAuth } from "../lib/AuthProvider";
export const CTX = React.createContext();
const initState = {
  general: [
    
  ],
  topic2: [
    
  ],
};
function reducer(state, action) {
  const { from, msg,img,  topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg ,img}],
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
    const [allChats, dispatch] = React.useReducer(reducer, initState);
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URI);
    socket.on("chat message", function(msg){
     dispatch({type:"RECEIVE_MESSAGE", payload:msg})
    })
  }
  const userName = props.user.name + " " + props.user.lastName
  const userId = props.user._id
  
  return (
    <CTX.Provider value={{ allChats, sendChatAction , userName , userId }}>
      {props.children}
    </CTX.Provider>
  );
}
export default withAuth(Store)

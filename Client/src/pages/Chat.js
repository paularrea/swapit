import React from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Store from "../components/Store";
const Chat = (props) => {
  const {params} = props.match
  let paramsId = params.id
  console.log(params)
  return (
    <div className="container">
      <Navbar />
      <Store params = {paramsId}>
        <Dashboard  />
      </Store>
    </div>
  );
};

export default Chat;

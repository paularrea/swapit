import React from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Store from "../components/Store";
const Chat = () => {
  return (
    <div className="container">
      <Navbar />
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
};

export default Chat;

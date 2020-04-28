import React from "react";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="text-center">
      <h1>Swap it!</h1>

      <div className="text-center">
        <Link to="/login">
          <div className="">
            <button className="btn btn-dark">Log in</button>
          </div>
        </Link>
        <Link to="/signup">
          <div className="">
            <button className="btn btn-dark">Sign up</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Layout;

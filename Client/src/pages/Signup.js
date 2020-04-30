import React, { useState } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  let handleFormSubmit = (event) => {
    event.preventDefault();
    props.signup({ username, password, name, lastName });
  };

  return (
    <div className="fondoApp position-absolute">
      <div className=" m-3 padLog">
        <div className="loginsignup-form">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                required
                type="text"
                name="name"
                className="form-control formLog"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                required
                type="text"
                name="lastName"
                className="form-control formLog"
                placeholder="Lastname"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                required
                type="text"
                name="username"
                className="form-control formLog"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                className="form-control formLog"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="text-center pt-3">
              <input type="submit" value="Sign up" className="btnOrangeLog" />
            </div>
          </form>
          <div className="logRedirect text-center pb-3">
            <h5>Already have account?</h5>
            <div className="mt-3">
              <Link to={"/login"} className="btnBlue2 ">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Signup);

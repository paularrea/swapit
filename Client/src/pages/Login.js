import React, { useState } from "react";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";


function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [listOfUsers, setListOfUsers] = useState([]);
  // const [messageErrPassword, setMessageErrPassword] = useState("");
  // const [messageErrUser, setMessageErrUser] = useState("");


  // let getAllUsers = async () => {
  //   axios.get("http://localhost:4000/api/users");
  //   await ((responseFromApi) => {
  //     setListOfUsers(responseFromApi.data);
  //   });
  // };
  // getAllUsers();


  // let handleFormSubmit = (event) => {
  //   event.preventDefault();
    
  //   //console.log('Login -> form submit', { username, password });
  //   let errorMessage = listOfUsers.findIndex(
  //     (user) => username === user.username
  //   );
  //   if (errorMessage === -1) {
  //     setMessageErrUser(
  //       errorMessage === -1 ? (
  //         <span className="text-danger">User doesn't exist</span>
  //       ) : (
  //         <span></span>
  //       )
  //     );
  //   } else {
  //     props.login({ username, password });
  //   }

  //   let errorPassword = listOfUsers.findIndex(
  //     (user) => password === user.password
  //     );

  //   console.log(errorPassword, "errorPassword");

  //   if (errorPassword === -1) {
  //     setMessageErrPassword(
  //       errorPassword === -1 ? (
  //         <span className="text-danger">Wrong Password</span>
  //       ) : (
  //         <span></span>
  //       )
  //     );
  //   } else {
  //     props.login({ username, password });
  //   }
  // };

  let handleFormSubmit = (event) => {
    event.preventDefault();
    props.login({ username, password });
  }

  return (
    <div className="fondoApp position-absolute">
      <div className=" m-3 padLog">
        <div className="loginsignup-form">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                required
                type="text"
                className="form-control formLog"
                name="username"
                placeholder="Username"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              {/* {messageErrUser} */}
            </div>
            <div className="form-group">
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                className="form-control formLog"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            {/* {messageErrPassword} */}

            <div className="text-center pt-3">
              <input type="submit" value="Log in" className="btnBlueLog" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default withAuth(Login);

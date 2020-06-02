import React, { useState, useEffect } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        process.env.REACT_APP_API_URI + "/api/users"
      );

      setListOfUsers(result.data);
    };
    fetchData();
  }, []);

  let validateUsername = listOfUsers.findIndex((user) => {
    return username === user.username;
  });
  let validateName = name.length < 2 && <p className="text-center text-danger">the name must have a minimum of 2 characters</p> 
  let validatePassword = password !== repeatPassword && <p className="text-center text-danger">Passwords don't match</p> 
  let validatePasswordLength = password.length < 6 && <p className="text-center text-danger">The password is too short</p> 
  let handleFormSubmit = (event) => {
    event.preventDefault();
    if(name.length < 2){
      console.log("the name must have a minimum of 2 characters")
    }
    if(password !== repeatPassword){
      console.log("Passwords don't match")
    }
    if(password.length < 6){
      console.log("Passwords is too short")
    }
    if(validateUsername === 0){
      console.log("this user already exist")
    }else{

      props.signup({ username, password, name, lastName });
    }
  };
  
  let errorUsername = (
    <p className="text-danger text-center mt-2">This user already exist</p>
  );

  return (
    
      <div className=" m-3 padLog">
      
        <h1 className ="text-center mt-5">Singup</h1>
          <form onSubmit={handleFormSubmit} className="text-center formLog">
            <div className="form-group">
              <input
                required
                type="text"
                name="name"
                className="form-control text-center"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {name.length > 0 && validateName}
            </div>
            <div className="form-group">
              <input
                required
                type="text"
                name="lastName"
                className="form-control text-center"
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
                className="form-control text-center"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              {validateUsername === 0 && errorUsername}
            </div>
            <div className="form-group">
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                className="form-control text-center"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {password.length > 0 && validatePasswordLength}
            <div className="form-group">
              <input
                required
                type="password"
                name="repeatPassword"
                placeholder="Repeat Password"
                className="form-control text-center"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
              />
              {repeatPassword.length > 0 && validatePassword}
            </div>
            <div className="text-center pt-3">
              <input type="submit" value="Sign up" className="btn btn-primary" />
            </div>
          </form>
          <div className="logRedirect text-center pb-3">
            <h5 className="mt-3">Already have account?</h5>
            <div className="mt-3">
              <Link to={"/login"} className="btnBlue2 ">
                Log in
              </Link>
            </div>
          </div>
       
      
    </div>
  );
}

export default withAuth(Signup);

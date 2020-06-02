import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  TextField,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { withAuth } from "../lib/AuthProvider";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  const [values, setValues] = useState({
    showPassword: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        process.env.REACT_APP_API_URI + "/api/users"
      );

      setListOfUsers(result.data);
    };
    fetchData();
  }, []);

  let validate = listOfUsers.findIndex((user) => {
    return user.username === username;
  });

  let handleFormSubmit = (event) => {
    event.preventDefault();
    props.login({ username, password });
  };
  let spanValidateUser = (
    <p className="text-danger text-center mt-2">This User not exist</p>
  );

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="text-center">
        <div>
        <TextField
          className="input-form"
          id="username"
          name="usernameEdit"
          placeholder="username"
          type="text"
          variant="outlined"
          label="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></TextField>
        </div>
        <div>
        <FormControl className="input-form" variant="outlined">
          {validate === -1 && username.length > 0 && spanValidateUser}
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          <FormHelperText>{props.errMessage}</FormHelperText>
        </FormControl>
        </div>
        <div className ="text-center">
        <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <div className="logRedirect text-center pb-3">
        <h5 className="mt-3">You don't have an account?</h5>
        <div className="mt-3">
          <Link to={"/signup"} className="btnBlue2 ">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default withAuth(Login);

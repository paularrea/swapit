import React, { useState, useEffect } from "react";
import logoSwapit from "../img/logo_swapit.png";
import axios from "axios";
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
  Avatar,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { withAuth } from "../lib/AuthProvider";

const blueSwapit = createMuiTheme({
  palette: {
    primary: {
      main: "#006f9b",
    },
  },
});

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

  let spanValidateUser = "This user does not exist";

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
   
    <div className="wrapper-registration ">
      <Avatar
        style={{ margin: "0 auto", width: "60px", height: "70px" }}
        src={logoSwapit}
      />
      <h2 className="text-center">Log in</h2>
      <form onSubmit={handleFormSubmit} className="text-center">
        <ThemeProvider theme={blueSwapit}>
          <div>
            <TextField
              className="input-form"
              id="username"
              name="usernameEdit"
              type="text"
              variant="outlined"
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              helperText={
                validate === -1 && username.length > 0 && spanValidateUser
              }
            ></TextField>
          </div>
          <div>
            <FormControl className="input-form" variant="outlined">
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
              <FormHelperText error>{props.errMessage}</FormHelperText>
            </FormControl>
          </div>
          <div className="text-center mt-4">
            <button className="btn-blueSwapit">Login</button>
          </div>
        </ThemeProvider>
      </form>
      <div className="logRedirect text-center pb-3">
        <p className="mt-3">You don't have an account yet?</p>
        <div type="submit" className="mt-3 blueSwapitP" onClick={props.openS}>
          Sign Up
        </div>
      </div>
    </div>
   
  );
};
export default withAuth(Login);

import React, { useState, useEffect } from "react";
import logoSwapit from "../img/logo_swapit.png";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  IconButton,
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

const blueSwapit = createMuiTheme({
  palette: {
    primary: {
      main: "#006f9b",
    },
  },
});

const strongRegex = /^[A-Za-z]\w{7,14}$/;

function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
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

  let validateUsername = listOfUsers.findIndex((user) => {
    return username === user.username;
  });

  let validateName = name.length < 2 && "Minimum length is 2 characters ";
  let validatePassword =
    password !== repeatPassword && "Passwords doesn't match";
  let validatePasswordLength =
    !password.match(strongRegex) &&
    "The password needs at least a capital letter and a number";

  let handleFormSubmit = (event) => {
    event.preventDefault();
    if (name.length < 2) {
      console.log("the name must have a minimum of 2 characters");
    }
    if (password !== repeatPassword) {
      console.log("Passwords don't match");
    }
    if (!password.match(strongRegex)) {
      console.log("Passwords is too short");
    }
    if (validateUsername === 0) {
      console.log("this user already exist");
    } else {
      props.signup({ username, password, name, lastName });
    }
  };

  let errorUsername = "This user already exists!";
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="wrapper-registration">
      <Avatar
        style={{ margin: "0 auto", width: "60px", height: "70px" }}
        src={logoSwapit}
      />
      <h2 className="text-center">Sign up</h2>
      <form onSubmit={handleFormSubmit} className="text-center">
        <ThemeProvider theme={blueSwapit}>
          <div>
            <TextField
              className="input-form"
              id="name"
              name="name"
              type="text"
              variant="outlined"
              label="Name"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
              helperText={name.length > 0 && validateName}
            ></TextField>
          </div>
          <div>
            <TextField
              className="input-form"
              id="lastName"
              name="lastName"
              type="text"
              variant="outlined"
              label="Lastname"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            ></TextField>
          </div>
          <div>
            <TextField
              className="input-form"
              id="username"
              name="username"
              type="text"
              variant="outlined"
              label="Username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
              helperText={validateUsername === 0 && errorUsername}
            ></TextField>
          </div>
          <div>
            <FormControl className="input-form" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
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
              <FormHelperText error>
                {password.length > 0 && validatePasswordLength}
              </FormHelperText>
            </FormControl>
          </div>

          <div>
            <FormControl className="input-form" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Repeat Password
              </InputLabel>
              <OutlinedInput
                name="repeatPassword"
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
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
              <FormHelperText error>
                {repeatPassword.length > 0 && validatePassword}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="text-center pt-3">
            <input type="submit" value="Sign up" className="btn-blueSwapit" />
          </div>
        </ThemeProvider>
      </form>
      <div className="logRedirect text-center pb-3">
        <p className="mt-3">Already have an account?</p>
        <div type="submit" className=" mt-3 blueSwapitP" onClick={props.openL}>
          Log in
        </div>
      </div>
    </div>
  );
}

export default withAuth(Signup);

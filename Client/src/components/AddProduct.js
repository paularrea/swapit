import React, { useState, useEffect } from "react";
import axios from "axios";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  TextField,
  ThemeProvider,
  createMuiTheme,
  Button,
  MenuItem,
  Avatar,
} from "@material-ui/core";

const blueSwapit = createMuiTheme({
  palette: {
    primary: {
      main: "#006f9b",
    },
  },
});

const categories = [
  {
    value: "drawings",
    label: "Drawings",
  },
  {
    value: "textile",
    label: "Textile",
  },
  {
    value: "decoration",
    label: "Decoration",
  },
  {
    value: "wood",
    label: "Wood",
  },
  {
    value: "photography",
    label: "Photography",
  },
];

const AddProduct = (props) => {
  const [category, setCategory] = useState();
  const [error, setError] = useState();
  const [maxLength, setMaxLength] = useState(0);
  const [creation, setCreation] = useState({
    title: "",
    description: "",
    category: "",
    imgPath: "",
    creator: props.user._id,
  });
  
  let fileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgPath", e.target.files[0]);
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URI + "/api/upload",
        formData
      );

      creation.imgPath = res.data.secure_url;
     
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    
  }, [creation, error])

  let onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCreation({
      ...creation,
      [name]: value,
    });
    setMaxLength({
      description: value.length,
    });
    setCategory(e.target.value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    if(creation.imgPath.length === 0){
      setError("The image is not uploaded yet")
    
    }else{
      setError(undefined)
      await service.uploadCreation(creation);
      console.log("Creation Added!");
    }
  };
console.log(error)
  return (
    <div className="wrapper-registration text-center">
      <h3>Create a new Product</h3>
      {creation.imgPath === 0 ? <Avatar/>   : <Avatar className="text-center" src={creation.imgPath} />}
      {(error !== undefined && creation.imgPath.length === 0)&& <p className="text-danger">{error}</p>}

      <ThemeProvider theme={blueSwapit}>
        <form className="mt-3" onSubmit={(e) => handleSubmit(e)}>
          <div className="uploadProduct-input" style={{ position: "relative" }}>
            <input
              accept="image/*"
              name="imgPath"
              style={{ display: "none" }}
              id="idProductInput"
              multiple
              
              onChange={(e) => fileUpload(e)}
              type="file"
            />
            <label htmlFor="idProductInput">
              <Button variant="raised" component="span">
                Upload Image
              </Button>
            </label>
          </div>

          <div>
            <TextField
              className="input-form"
              id="titleInput"
              name="title"
              type="text"
              variant="outlined"
              label="Title"
              onChange={(e) => onChange(e)}
            ></TextField>
          </div>

          <div>
            <TextField
              inputProps={{ maxLength: 170 }}
              type="text"
              name="description"
              className="inputDescription"
              id="titleInput"
              variant="outlined"
              label="Description"
              multiline
              onChange={(e) => onChange(e)}
              helperText={
                maxLength.description === 170 && (
                  <p style={{ color: "#931F1D" }}>
                    You have reached the maximum number of characters.
                  </p>
                )
              }
            ></TextField>
          </div>
          <div>
            <TextField
              name="category"
              className="input-form"
              id="categoryInput"
              select
              value={category}
              onChange={(e) => onChange(e)}
              helperText="Please select item category"
              variant="outlined"
              label="Select category"
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <button className="mt-4 btn-blueSwapit" type="submit">
              {" "}
              Create!{" "}
            </button>
          </div>
        </form>
      </ThemeProvider>
    </div>
  );
};

export default withAuth(AddProduct);

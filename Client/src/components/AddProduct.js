import React, { useState } from "react";
import axios from "axios";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";

const AddProduct = (props) => {
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
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    await service.uploadCreation(creation);
    props.history.push("/private/profile");
    console.log("Creation Added!");
  };

  return (
    <div onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-center">Create a new Product:</h1>
      <form>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="imgPath"
            className="form-control"
            id="imageInput"
            placeholder="Upload Img"
            onChange={(e) => fileUpload(e)}
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="titleInput"
            placeholder="title"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            maxLength="170"
            type="text"
            name="description"
            className="form-control"
            id="descriptionInput"
            placeholder="Description..."
            onChange={(e) => onChange(e)}
          />
        </div>
        {maxLength.description === 170 && (
          <p style={{ color: "#931F1D" }}>
            You have reached the maximum number of characters.
          </p>
        )}
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            type="text"
            className="form-control text-center"
            id="categoryInput"
            placeholder="Category"
            onChange={(e) => onChange(e)}
          >
            <option disabled selected>
              select category...
            </option>
            <option value="drawings">Drawings</option>
            <option value="textile">Textile</option>
            <option value="decoration">Decoration</option>
            <option value="wood">Wood</option>
            <option value="photography">Photography</option>
          </select>
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            {" "}
            Create!{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(AddProduct);

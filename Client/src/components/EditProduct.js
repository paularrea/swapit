import React, { useState, useEffect } from "react";
import logo from "../img/user-solid.svg";
import axios from "axios";

const EditProduct = (props) => {
  const [productEdited, setProductEdited] = useState({
      imgPath:''
  });
  const { params } = props.match;
  let productId = params.id;

  console.log(props, "proooops");
  let onChangeTitle = (e) => {
    productEdited.title = e.target.value;
  };
  let onChangeDescription = (e) => {
    productEdited.description = e.target.value;
  };

  let onChangeCategory = (e) => {
    productEdited.category = e.target.value;
  };

  let fileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgPath", e.target.files[0]);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/upload",
        formData
      );
      productEdited.imgPath = res.data.secure_url;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        const productInfo = await axios.get(
            `http://localhost:4000/api/product/${productId}`
          );
          setProductEdited(productInfo.data);
    };
    fetchData();
  }, [productId]);

  console.log(productEdited, 'productInfo')

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productEdited);
    await axios.put(`http://localhost:4000/api/edit-product/${productId}`, productEdited)
    props.history.push("/private/profile");
    console.log("Edited!");
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <div className="col text-center pb-3">
            <p htmlFor="idEditProductImg">Edit image</p>
            <img
              className="navIcons"
              src={productEdited.imgPath ? productEdited.imgPath : logo}
              alt=""
            />
          </div>

          <input
            type="file"
            required
            className="form-control"
            id="idEditProductImg"
            name="imgPath"
            aria-describedby="image"
            placeholder={productEdited.imgPath}
            onChange={(e) => fileUpload(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idTitle">Title</label>
          <input
            required
            className="form-control"
            id="idTitle"
            aria-describedby="Title"
            placeholder={productEdited.title}
            type="text"
            name="title"
            defaultValue={productEdited.title || ""}
            onChange={onChangeTitle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idDescription">Description</label>
          <textarea
            required
            className="form-control"
            id="idDescription"
            aria-describedby="Description"
            placeholder={productEdited.description}
            type="text"
            name="description"
            defaultValue={productEdited.description || ""}
            onChange={onChangeDescription}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            type="text"
            className="form-control text-center"
            id="idCategory"
            placeholder={productEdited.category}
            onChange={onChangeCategory}
          >
            <option disabled selected>select category...</option>
            <option value="drawings">Drawings</option>
            <option value="handmade">Textile</option>
            <option value="handmade">Decoration</option>
            <option value="wood">Wood</option>
            <option value="photography">Photography</option>
          </select>
        </div>
        <div></div>

        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            Save Edit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

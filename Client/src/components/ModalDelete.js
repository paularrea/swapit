import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

const ModalDelete = (props) => {
  const productId = props.productId;
  console.log(productId, 'modal')

  let deleteProduct = (e) => {
    const userId = props.user._id;
    const likeListToRemove = props.user.likeList;
    const filteredLikeList = [];
    likeListToRemove.forEach((obj) => {
      if (productId === obj.productLiked) {
        filteredLikeList.push(obj);
        
      }
    });
    axios.post(process.env.REACT_APP_API_URI + `/api/remove-product-link`, {
      userId,
      productId,
      filteredLikeList,
    });
    axios.delete(process.env.REACT_APP_API_URI + `/api/product/${productId}`);
    props.closeDelete();
  };


  return (
    <div className="wrapper-registration">
      <h2 className="text-center">Are you sure?</h2>
      <p className="text-center">
        Pressing accept you are deleting your creation from your list and others are not going to see it anymore.
      </p>
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn-blueSwapit"
          type="submit"
          onClick={(e) => {
            deleteProduct(e)
          }}
        >
          Accept
        </button>
        <Link style={{textDecoration:'none'}} className="btn-deleteSwapit text-light" onClick={props.closeDelete} to="/private/profile">
          Refuse
        </Link>
      </div>
    </div>
  );
};

export default withAuth(ModalDelete);

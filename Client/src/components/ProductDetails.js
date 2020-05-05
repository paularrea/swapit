import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";
import heartOff from "../img/heart-regular.png";
import heartOn from "../img/heart-solid.png";
import { Link } from "react-router-dom";


const ProductDetails = (props) => {
  const [productInfo, setProductInfo] = useState();
  const [likeListId, setLikeListId] = useState("");
  const [buttonOn, setButtonOn] = useState(false);
  const { params } = props.match;
  let productId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const InfofromDB = await axios.get(
        `http://localhost:4000/api/product/${productId}`
      );
      setProductInfo(InfofromDB.data);
    };
    fetchData();
  }, [productId, buttonOn]);

  useEffect(() => {
    let getLikeList = () => {
      productInfo !== undefined &&
        productInfo.creator.likeList.forEach((matchLikeList) => {
          if (
            matchLikeList.userWhoLikes === props.user._id &&
            matchLikeList.productLiked === productId
          ) {
            setLikeListId(matchLikeList);
          } else {
            console.log("No hay coincidencias");
          }
        });
    };
    getLikeList();
  }, [productInfo, productId, props.user._id]);

  let addWantSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.getWantedCreation(productInfo);
      console.log("Creation Added to your wantList!");
      setButtonOn(!buttonOn);
    } catch (err) {
      console.log(err);
    }
  };

  let removeWantSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.deleteWant({
        productId: productId,
        creatorId: productInfo.creator,
        likeListId: likeListId,
      });
      console.log("Creation Deleted to your wantList!");
      setButtonOn(!buttonOn);
    } catch (err) {
      console.log(err);
    }
  };

  let userExist =
    productInfo !== undefined &&
    productInfo.interestedUser.findIndex((user) => user === props.user._id);

  let isEqual =
    productInfo !== undefined && props.user._id === productInfo.creator._id;
  console.log(isEqual, "isEqual");

  const likedProduct = !isEqual ? (
    userExist !== -1 ? (
      <img
        onClick={(e) => removeWantSubmit(e)}
        alt="heart"
        type="submit"
        src={heartOn}
        className="heart"
      ></img>
    ) : (
      <div>
        <img
          alt="heart"
          onClick={(e) => addWantSubmit(e)}
          type="submit"
          src={heartOff}
          className="heart mb-2"
        ></img>
        <br />
        <button
          onClick={(e) => addWantSubmit(e)}
          className="btn btn-dark"
          type="submit"
        >
          Swap it!
        </button>
      </div>
    )
  ) : (
    <Link className="btn btn-primary" to={`/private/edit-product/${productId}`}>
      Edit
    </Link>
  );

  const showDetails = productInfo && (
    <div className="detailsCard">
      <img src={productInfo.imgPath} alt="" />
      <h5>{productInfo.title}</h5>
      <p>{productInfo.description}</p>
    </div>
  );

  return (
    <div>
      <div>{showDetails}</div>
      <div>{likedProduct}</div>
    </div>
  );
};

export default withAuth(ProductDetails);

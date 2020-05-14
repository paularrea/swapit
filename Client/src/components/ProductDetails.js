import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";
import heartOff from "../img/heart-regular.png";
import heartOn from "../img/heart-solid.png";
import { Link } from "react-router-dom";
import backLogo from "../img/back.png";


const ProductDetails = (props) => {
  const [productInfo, setProductInfo] = useState();
  const [likeListId, setLikeListId] = useState("");
  const [buttonOn, setButtonOn] = useState(false);
  const { params } = props.match;
  let productId = params.id;
  let userId = productInfo !== undefined && productInfo.creator._id;

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
    productInfo.interestedUser.findIndex((user) => user._id === props.user._id);

  let isEqual =
    productInfo !== undefined && props.user._id === productInfo.creator._id;

  const likedProduct = !isEqual ? (
    userExist !== -1 ? (
      <div className="btn-heart btn-heart d-flex align-items-center">
        <img
          onClick={(e) => removeWantSubmit(e)}
          alt="heart"
          type="submit"
          src={heartOn}
          className="heart"
        ></img>
        
      </div>
    ) : (
      <div className="swapit-absolute">
        <div className="swapit-btn text-center">
          <button
            onClick={(e) => addWantSubmit(e)}
            className="btn btn-dark"
            type="submit"
          >
            Swap it!
          </button>
        </div>
        <div className="btn-heart d-flex align-items-center">
          <img
            alt="heart"
            onClick={(e) => addWantSubmit(e)}
            type="submit"
            src={heartOff}
          ></img>
        </div>
      </div>
    )
  ) : (
    <Link className="btn btn-primary" to={`/private/edit-product/${productId}`}>
      Edit
    </Link>
  );

  const creatorDetails = productInfo && (
    <div className="creatorDetails d-flex justify-content-start align-items-center">
      <div>
        <img
          className="creatorImage"
          src={productInfo.creator.imgPath}
          alt=""
        />
      </div>
      <div>
        <p>
          {productInfo.creator.name} {productInfo.creator.lastName}
        </p>
      </div>
    </div>
  );

  const showDetails = productInfo && (
    <div className="detailsCard">
      <div
        className="detailsContainer imgContainer position-relative"
      >
        <img src={productInfo.imgPath} className='detailsImgCard' alt=""/>
        <div className="btn-back  d-flex align-items-center">
         
          <Link className="" to="/private">
            <img className="backLogo" src={backLogo} alt="heart" />
          </Link>
        </div>
        {likedProduct}
      </div>
      <div className="detailsContainer text-left">
      <h3 className="text-center mt-3">{productInfo.title}</h3>
        <b>
          <p>Created by:</p>
        </b>
        <Link to={`/private/user-profile/${userId}`}>{creatorDetails}</Link>

        <b>
          <p>Description:</p>
        </b>
        {productInfo.description}
      </div>
    </div>
  );

  return <div>{showDetails}</div>;
};

export default withAuth(ProductDetails);

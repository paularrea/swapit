import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";
import heartOff from "../img/heart-regular.png";
import heartOn from "../img/heart-solid.png";
import { Link } from "react-router-dom";
import backLogo from "../img/back.png";
import Masonry from "react-masonry-css";

const ProductDetails = (props) => {
  const [productInfo, setProductInfo] = useState();
  const [allProducts, setAllProducts] = useState();
  const [likeListId, setLikeListId] = useState("");
  const [buttonOn, setButtonOn] = useState(false);
  const { params } = props.match;
  let productId = params.id;
  let userId = productInfo !== undefined && productInfo.creator._id;
  let breakpointColumnsObj = {
    default: 4,
    1100: 4,
    700: 2,
    500: 2,
  };

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
    const fetchData = async () => {
      const InfofromDB = await axios.get(
        `http://localhost:4000/api//allproducts`
      );
      setAllProducts(InfofromDB.data);
    };
    fetchData();
  }, []);

  const filterRecomendations =
    productInfo !== undefined &&
    allProducts !== undefined &&
    allProducts.map((product) => {
      if (
        product.category === productInfo.category &&
        product.title !== productInfo.title
      ) {
        return (
          <Link
            key={product._id}
            to={`/private/product-details/${product._id}`}
          >
            <div className="creationsCard mt-3">
              <img className="sizeMobile" src={product.imgPath} alt="" />
            </div>
          </Link>
        );
      }
      return <p></p>;
    });

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

  const heartBtn =
    isEqual === false &&
    (userExist !== -1 ? (
      <div className="btn-heart">
        <img
          onClick={(e) => removeWantSubmit(e)}
          alt="heart"
          type="submit"
          src={heartOn}
          className="heart"
        ></img>
      </div>
    ) : (
      <div className="btn-heart">
        <img
          alt="heart"
          onClick={(e) => addWantSubmit(e)}
          type="submit"
          src={heartOff}
          className="heart"
        ></img>
      </div>
    ));

  const swapitBtnMobile = userExist === -1 && (
    <div className="text-center">
      <button
        onClick={(e) => addWantSubmit(e)}
        className="btn-swapit-mobile"
        type="submit"
      >
        Swap it!
      </button>
    </div>
  );

  const swapitBtnDesktop = userExist === -1 && (
    <div className="text-center mt-2">
      <button className="btn-swapit-desktop" onClick={(e) => addWantSubmit(e)}>
        Swap it!
      </button>
    </div>
  );

  const editBtn = isEqual && (
    <div className="text-center mt-2">
      <Link
        className="edit-btn-desktop"
        to={`/private/edit-product/${productId}`}
      >
        Edit
      </Link>
    </div>
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

  
  
  const showDetails =
  productInfo !== undefined ? (
    <div style={{ position: "relative", bottom: "0px", right: "0px" }}>
        <Link
          className="btn-back d-flex justify-content-start m-2"
          to="/private"
        >
          <img className="backLogo" src={backLogo} alt="heart" />
        </Link>
        <div className="detailsCard">
          {productInfo.imgPath.height < 10 ? (
            <p>Esta mierda funciona</p>
          ):(<p>Esta no mierda funciona</p>)}
          <div
            className="ImgContainerCard"
            style={{ position: "relative", bottom: "0px", right: "0px" }}
          >
            <img
            id='imgDetail'
              style={{ position: "relative", bottom: "0px", right: "0px" }}
              className="detailsImgCard"
              src={productInfo.imgPath}
              alt="logo"
            />
            <div
              className="d-flex justify-content-center"
              style={{
                position: "absolute",
                bottom: "5%",
                right: "5%",
                paddingTop: "10px",
              }}
            >
              {heartBtn}
            </div>
          </div>

          <div className="detailsContainer text-left">
            <h3 className="text-center mb-3">{productInfo.title}</h3>
            {!isEqual ? (
              window.innerWidth <= 500 ? (
                <div className="m-3">{swapitBtnMobile}</div>
              ) : (
                <div>{swapitBtnDesktop}</div>
              )
            ) : (
              <div>{editBtn}</div>
            )}
            <b>
              <p className="mt-2 mb-2">Created by:</p>
            </b>
            <Link to={`/private/user-profile/${userId}`}>{creatorDetails}</Link>

            <b>
              <p className="mt-3">Description:</p>
            </b>
            {productInfo.description}
          </div>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );
  return (
    <div>
      <div className="cardDetails">{showDetails}</div>
      <div className="cardDetails2">
        <h5>You may also like...</h5>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filterRecomendations}
        </Masonry>
      </div>
    </div>
  );
};

export default withAuth(ProductDetails);

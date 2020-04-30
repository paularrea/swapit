import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";

const ProductDetails = (props) => {
  const [productInfo, setProductInfo] = useState();
  const userId = props.user._id;
  console.log(userId, 'userId current')

  useEffect(() => {
    const fetchData = async () => {
      const { params } = props.match;
      const InfofromDB = await axios.get(
        `http://localhost:4000/api/product/${params.id}`
      );
      
      setProductInfo(InfofromDB.data);
    };
    fetchData();
  }, []);

  let handleSubmit = async (e) => {
    const { params } = props.match;
    console.log(productInfo._id, "info")
    e.preventDefault();
    await service.getWantedCreation(productInfo)
    props.history.push("/private");
    console.log("Creation Added to your wantList!");
  };

  const showDetails = productInfo ? (
    <div className="detailsCard">
      <img src={productInfo.imgPath} alt="" />
      <h5>{productInfo.title}</h5>
      <p>{productInfo.description}</p>
    </div>
  ) : (
    <div></div>
  );

  return (
    <div>
      <div>{showDetails}</div>
      <div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="btn btn-dark"
          type="submit"
        >
          Swap it!
        </button>
      </div>
    </div>
  );
};

export default withAuth(ProductDetails);

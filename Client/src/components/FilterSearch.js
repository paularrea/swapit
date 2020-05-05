import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

const FilterSearch = (props) => {
  const [filteredCategory, setFilteredCategory] = useState();

  let filterChange = (e) => {
    setFilteredCategory(e.target.value);
  };

  const displayAllProducts =
    props.allProducts &&
    props.allProducts.map((product) => {
      return (
        product.creator !== props.user._id && (
          <Link
            key={product._id}
            to={`/private/product-details/${product._id}`}
          >
            <div className="col creationsCard">
              <img src={product.imgPath} alt="" />
              <h3>{product.title}</h3>
            </div>
          </Link>
        )
      );
    });

  const displayFilteredProducts =
    props.allProducts &&
    props.allProducts.map((product) => {
      return (
        product.creator !== props.user._id &&
        (filteredCategory === product.category ? (
          <Link
            key={product._id}
            to={`/private/product-details/${product._id}`}
          >
            <div className="col creationsCard">
              <img src={product.imgPath} alt="" />
              <h3>{product.title}</h3>
            </div>
          </Link>
        ) : (
          product.creator !== props.user._id &&
          filteredCategory === "allProducts" && (
            <Link
              key={product._id}
              to={`/private/product-details/${product._id}`}
            >
              <div className="col creationsCard">
                <img src={product.imgPath} alt="" />
                <h3>{product.title}</h3>
              </div>
            </Link>
          )
        ))
      );
    });

  return (
    <div>
      <div
        className="row btn-group d-flex justify-content-around m-3"
        role="group"
        aria-label="Basic example"
      >
        <div>
          <button
            type="col button"
            onClick={(e) => filterChange(e)}
            className="btn btn-secondary"
            value="drawings"
          >
            Drawings
          </button>
        </div>
        <div>
          <button
            type="col button"
            value="wood"
            onClick={(e) => filterChange(e)}
            className="btn btn-secondary"
          >
            Wood
          </button>
        </div>
        <div>
          <button
            type="col button"
            onClick={(e) => filterChange(e)}
            className="btn btn-secondary"
            value="textile"
          >
            Textile
          </button>
        </div>
        <div>
          <button
            value="decoration"
            type="col button"
            onClick={(e) => filterChange(e)}
            className="btn btn-secondary"
          >
            Decoration
          </button>
        </div>
        <div>
          <button
            value="photography"
            type="col button"
            onClick={(e) => filterChange(e)}
            className="btn btn-secondary"
          >
            Photograpy
          </button>
        </div>
        <div>
          <button
            value="allProducts"
            type="col button"
            className="btn btn-secondary active"
            onClick={(e) => filterChange(e)}
          >
            All
          </button>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        {filteredCategory !== undefined
          ? displayFilteredProducts
          : displayAllProducts}
      </div>
    </div>
  );
};

export default withAuth(FilterSearch);

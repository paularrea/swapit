import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import { Collapse, Button } from "react-bootstrap";

const FilterSearch = (props) => {
  const [filteredCategory, setFilteredCategory] = useState();
  const [openCategory, setOpenCategory] = useState(false);

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
            <div className="col discoverCard mt-3">
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
            <div className="col creationsCard mt-3">
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
      <Button
        className="btn-searchCategory"
        onClick={() => setOpenCategory(!openCategory)}
        aria-controls="category-collapse"
        aria-expanded={openCategory}
      >
        search for category ...
      </Button>
      <Collapse in={openCategory}>
          <div id="category-collapse"
          role="group"
          aria-label="Basic example"
        >
          <div>
            <button
              type="button"
              onClick={(e) => filterChange(e)}
              className="btn btn-secondary btnCategory"
              value="drawings"
            >
              Drawings
            </button>
          </div>
          <div>
            <button
              type="button"
              value="wood"
              onClick={(e) => filterChange(e)}
              className="btn btn-secondary btnCategory"
            >
              Wood
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={(e) => filterChange(e)}
              className="btn btn-secondary btnCategory"
              value="textile"
            >
              Textile
            </button>
          </div>
          <div>
            <button
              value="decoration"
              type="button"
              onClick={(e) => filterChange(e)}
              className="btn btn-secondary btnCategory"
            >
              Decoration
            </button>
          </div>
          <div>
            <button
              value="photography"
              type="button"
              onClick={(e) => filterChange(e)}
              className="btn btn-secondary btnCategory"
            >
              Photograpy
            </button>
          </div>
          <div>
            <button
              value="allProducts"
              type="button"
              className="btn btn-secondary active btnCategory"
              onClick={(e) => filterChange(e)}
            >
              All
            </button>
          </div>
        </div>
      </Collapse>
      <div className="row d-flex justify-content-center">
        {filteredCategory !== undefined
          ? displayFilteredProducts
          : displayAllProducts}
      </div>
    </div>
  );
};

export default withAuth(FilterSearch);

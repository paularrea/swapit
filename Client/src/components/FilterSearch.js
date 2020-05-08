import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import { Collapse, Button } from "react-bootstrap";
import dropAbajo from "../img/dropAbajo.png";
import dropArriba from "../img/dropArriba.png";

const FilterSearch = (props) => {
  const [filteredCategory, setFilteredCategory] = useState();
  const [openCategory, setOpenCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  let filterChange = (e) => {
    setFilteredCategory(e.target.value);
  };
  let searchHandler = (query) => {
    setSearchQuery(query.target.value);
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
              <h4>{product.title}</h4>
            </div>
          </Link>
        )
      );
    });
  const searchBarProducts =
    searchQuery &&
    props.allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const displayFilteredProducts = searchBarProducts
    ? searchBarProducts.map((product) => {
        return (
          <Link
            key={product._id}
            to={`/private/product-details/${product._id}`}
          >
            <div className="col creationsCard mt-3">
              <img src={product.imgPath} alt="" />
              <h3>{product.title}</h3>
            </div>
          </Link>
        );
      })
    : props.allProducts &&
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
                <div className="col creationsCard mt-3">
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
      <div className="d-flex justify-content-center ">
        <input
          className="searchBar mb-2 pl-3"
          placeholder="Search..."
          type="text"
          name="search"
          onChange={(e) => searchHandler(e)}
        />
      </div>
    
        <Button
          className="btn-searchCategory text-left"
          onClick={() => setOpenCategory(!openCategory)}
          aria-controls="category-collapse"
          aria-expanded={openCategory}
        >
          <div className='d-flex justify-content-between align-items-center'>
          <p className=''>Filter by category...</p>
          <img
          className='dropdown'
          src={openCategory !== false ? dropArriba : dropAbajo}
          alt={openCategory === true ? "drop arriba" : "drop abajo"}
        /></div>
        </Button>
      
      <Collapse in={openCategory}>
        <div
          id="category-collapse"
          role="group"
          aria-label="Basic example"
          className="m-1 category-group"
        >
          <div>
            <button
              type="button"
              onClick={(e) => filterChange(e)}
              className="btn btn-drawings btnCategory"
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
              className="btn btn-wood btnCategory"
            >
              Wood
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={(e) => filterChange(e)}
              className="btn btn-textile btnCategory"
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
              className="btn btn-decoration btnCategory"
            >
              Decoration
            </button>
          </div>
          <div>
            <button
              value="photography"
              type="button"
              onClick={(e) => filterChange(e)}
              className="btn btn-photograpy btnCategory"
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
        {searchQuery.length <= 0 && filteredCategory === undefined
          ? displayAllProducts
          : displayFilteredProducts}
      </div>
    </div>
  );
};

export default withAuth(FilterSearch);

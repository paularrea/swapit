import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import { Collapse, Button } from "react-bootstrap";
import dropAbajo from "../img/dropAbajo.png";
import dropArriba from "../img/dropArriba.png";
import Masonry from "react-masonry-css";
import { Spinner } from "react-bootstrap";

const FilterSearch = (props) => {
  const [filteredCategory, setFilteredCategory] = useState();
  const [openCategory, setOpenCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  let breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  

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
            <div className="discoverCard mt-3">
              <img src={product.imgPath} alt="" />
              <h5>{product.title}</h5>
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
            <div className="discoverCard mt-3">
              <img src={product.imgPath} alt="" />
              <h5>{product.title}</h5>
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
              <div className="discoverCard mt-3">
                <img src={product.imgPath} alt="" />
                <h5>{product.title}</h5>
              </div>
            </Link>
          ) : (
            product.creator !== props.user._id &&
            filteredCategory === "allProducts" && (
              <Link
                key={product._id}
                to={`/private/product-details/${product._id}`}
              >
                <div className="discoverCard mt-3">
                  <img src={product.imgPath} alt="" />
                  <h5>{product.title}</h5>
                </div>
              </Link>
            )
          ))
        );
      });

  let categoryFilterDesktop = (
    <div className='d-flex justify-content-between'>
      <button
      type='button'
        onClick={(e) => filterChange(e)}
        className="btn-drawings2 btnCategory2 m-1"
        value="drawings"
      >Draw
      </button>
      <button
      type='button'
        onClick={(e) => filterChange(e)}
        className="btn-wood2 btnCategory2 m-1"
        value="wood"
      >Wood
      </button>
      <button
      type='button'
        onClick={(e) => filterChange(e)}
        className="btn-decoration2 btnCategory2 m-1"
        value="decoration"
      >Deco
      </button>
      <button
      type='button'
        onClick={(e) => filterChange(e)}
        className="btn-textile2 btnCategory2 m-1"
        value="textile"
      >Textile
      </button>
      <button
      type='button'
        onClick={(e) => filterChange(e)}
        className="btn-photography2 btnCategory2 m-1"
        value="photography"
      >Photo
      </button>
      <button
      type='button'
        onClick={(e) => filterChange(e)}
        className="btn-allProducts2 btnCategory2 m-1"
        value="allProducts"
      >All
      </button>
    </div>
  );

  let categoryFilterMobile = (
    <div>
      <Button
        className="btn-searchCategory text-left"
        onClick={() => setOpenCategory(!openCategory)}
        aria-controls="category-collapse"
        aria-expanded={openCategory}
      >
        <div className="d-flex justify-content-between align-items-center">
          <p className="noneMarginFilter">Filter by category...</p>
          <img
            className="dropdown"
            src={openCategory !== false ? dropArriba : dropAbajo}
            alt={openCategory === true ? "drop arriba" : "drop abajo"}
          />
        </div>
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
              className="btn btn-photography btnCategory"
            >
              Photography
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
    </div>
  );

  return (
    <div className="centerDiscover ">
      <div className="d-flex justify-content-center searchBarDiv">
        <input
          className="searchBar mb-2 pl-3"
          placeholder="Search..."
          type="text"
          name="search"
          onChange={(e) => searchHandler(e)}
        />
      </div>

      {window.innerWidth <= 500 ? categoryFilterMobile : categoryFilterDesktop}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid pt-3"
        columnClassName="my-masonry-grid_column"
      >
        {(searchQuery.length <= 0 && filteredCategory === undefined)
          ?( displayAllProducts === undefined ? <Spinner  animation="grow" variant="info" /> : displayAllProducts)
          : (displayFilteredProducts === undefined ? <Spinner  animation="grow" variant="info" /> : displayFilteredProducts)}
      </Masonry>
    </div>
  );
};

export default withAuth(FilterSearch);

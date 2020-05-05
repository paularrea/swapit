import React, { useState, useEffect } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import FilterSearch from "../components/FilterSearch";


const Discover = (props) => {
  const [allProducts, setAllProducts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const products = await service.getAllTheProducts();
      setAllProducts(products);
    };
    fetchData();
  }, []);

  const displayAllCreations = allProducts ? (
    allProducts.map((product) => {
      if (product.creator !== props.user._id) {
        return (
          <Link
            key={product._id}
            to={`/private/product-details/${product._id}`}
          >
            <div className="col creationsCard">
              <img src={product.imgPath} alt="" />
              <h3>{product.title}</h3>
            </div>
          </Link>
        );
      } else {
        return <span></span>;
      }
    })
  ) : (
    <div></div>
  );

  return (
    <div>
       <div classNameName="">
      <FilterSearch allProducts = {allProducts}/>
      </div>
     
    </div>
  );
};

export default withAuth(Discover);

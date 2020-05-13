import React, { useState, useEffect } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import FilterSearch from "../components/FilterSearch";
import Navbar from "../components/Navbar";

const Discover = (props) => {
  const [allProducts, setAllProducts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const products = await service.getAllTheProducts();
      setAllProducts(products);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Navbar />
      </div>
      <div className="container">
        <FilterSearch allProducts={allProducts} />
      </div>
    </div>
  );
};

export default withAuth(Discover);

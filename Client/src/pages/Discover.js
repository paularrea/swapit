import React, { useState, useEffect } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
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

  

  return (
    <div>
       <div className="">
      <FilterSearch allProducts = {allProducts}/>
      </div>
     
    </div>
  );
};

export default withAuth(Discover);

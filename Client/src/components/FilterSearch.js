import React, {useState} from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

const FilterSearch = (props) => {
  const [filteredCategory, setFilteredCategory] = useState();

let filterChange = (e) =>  {
setFilteredCategory(e.target.value)
}

  const displayAllCreations =
    props.allProducts &&
    (props.allProducts.map((product) => {
      return product.creator !== props.user._id &&
       (filteredCategory === product.category && (
        <Link key={product._id} to={`/private/product-details/${product._id}`}>
          <div className="col creationsCard">
            <img src={product.imgPath} alt="" />
            <h3>{product.title}</h3>
          </div>
        </Link>
      ))
    }));

  return (<div className="row btn-group" role="group" aria-label="Basic example">
        <button
          type="col button"
          onClick={(e) => filterChange(e)}
          className="btn btn-secondary"
          value="drawings"
        >
          Drawings
        </button>
        <button
          type="col button"
          value="wood"
          onClick={(e) => filterChange(e)}
          className="btn btn-secondary"
        >
          Wood
        </button>
        <button
          type="col button"
          onClick={(e) => filterChange(e)}
          className="btn btn-secondary"
          value="textile"
        >
          Textile
        </button>
        <button
          value="decoration"
          type="col button"
          onClick={(e) => filterChange(e)}
          className="btn btn-secondary"
        >
          Decoration
        </button>
        <button
          value="photography"
          type="col button"
          onClick={(e) => filterChange(e)}
          className="btn btn-secondary"
        >
          Photograpy
        </button> 
        <div className="row d-flex justify-content-center">
        {displayAllCreations}
      </div>
    </div>)
}






export default withAuth(FilterSearch);

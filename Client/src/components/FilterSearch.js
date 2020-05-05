import React, {useState} from "react";
import { Link } from "react-router-dom";

const FilterSearch = (props) => {
  const [filteredCategory, setFilteredCategory] = useState();
  console.log(props)



let filtered = props.allProducts.forEach(product => {
  switch (product.category) {
    case 'drawings':
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
        case 'drawings':
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
  
    default:
      break;
  }
});

  let drawings = props.allProducts.filter(
    (e) => e.value === "drawings");
  let wood = props.allProducts.category.filter((e) => e.value === "wood");
  let textile = props.allProducts.category.filter((e) => e.value === "textile");
  let deco = props.allProducts.category.filter((e) => e.value === "decoration");
  let photo = props.allProducts.category.filter((e) => e.value === "photography"
  );

  // const filterDraw = () => {
  //   setFilteredCategory(drawings);
  // };
  // const filterWood = () => {
  //   setFilteredCategory(wood);
  // };
  // const filterTextile = () => {
  //   setFilteredCategory(textile);
  // };
  // const filterDeco = () => {
  //   setFilteredCategory(deco);
  // };
  // const filterPhoto = () => {
  //   setFilteredCategory(photo);
  // };

  // const displayAllCreations =
  //   props.allProducts &&
  //   (props.allProducts.map((product) => {
  //     return product.creator !== props.user._id && (
  //       <Link key={product._id} to={`/private/product-details/${product._id}`}>
  //         <div className="col creationsCard">
  //           <img src={product.imgPath} alt="" />
  //           <h3>{product.title}</h3>
  //         </div>
  //       </Link>
  //     );
  //   }));

  return (
  <div></div>
    //   <div className="row btn-group" role="group" aria-label="Basic example">
    //     {/* <button
    //       type="col button"
    //       onClick={(e) => filterDraw(e)}
    //       className="btn btn-secondary"
    //     >
    //       Drawings
    //     </button>
    //     <button
    //       type="col button"
    //       onClick={(e) => filterWood(e)}
    //       className="btn btn-secondary"
    //     >
    //       Wood
    //     </button>
    //     <button
    //       type="col button"
    //       onClick={(e) => filterTextile(e)}
    //       className="btn btn-secondary"
    //     >
    //       Textile
    //     </button>
    //     <button
    //       type="col button"
    //       onClick={(e) => filterDeco(e)}
    //       className="btn btn-secondary"
    //     >
    //       Decoration
    //     </button>
    //     <button
    //       type="col button"
    //       onClick={(e) => filterPhoto(e)}
    //       className="btn btn-secondary"
    //     >
    //       Photograpy
    //     </button> */}
    //     {/* <div className="row d-flex justify-content-center">
    //     {displayAllCreations}
    //   </div> */}
    // </div>
  );
};

export default FilterSearch;

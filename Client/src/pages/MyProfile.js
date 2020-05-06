import React, { useState, useEffect } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import logoutLogo from "../img/sign-out-alt-solid.svg";
import backLogo from "../img/back.png";

const Profile = (props) => {
  const [finalUser, setUserData] = useState({});
  const [myCreations, setMyCreations] = useState();
  const [havesBtn, setBtnHaves] = useState(false);
  const [wantsBtn, setBtnWants] = useState(true);
  
  
  useEffect(() => {
    const fetchData = async () => {
      const UserfromDB = await service.getUserInfo();
      const creations = await service.getMyProducts();

      setUserData(UserfromDB);
      setMyCreations(creations); 
    };
    fetchData();
  }, []);
  
  const { logout } = props;
 const displayHaveList = myCreations && (
    myCreations.haveList.map((creation) => {
      return (
       
       
        <div key={creation._id}>
        <Link  to={`/private/product-details/${creation._id}`}>
        <div  className="col haveListCard">
          <img src={creation.imgPath} alt="" />
          <p>{creation.title}</p>
          <p className="text-danger">{creation.interestedUser.length && creation.interestedUser.length}</p>
        </div>
        </Link>
        <Link to={`/private/product-delete/${creation._id}`} >🗑</Link>
        </div>
       
      );
    })
  ) 

  const displayWantList = myCreations && (
    myCreations.wantList.map((wantedCreations) => {

      return (
        <Link key={wantedCreations._id} to={`/private/product-details/${wantedCreations._id}`}>
        <div  className="col haveListCard">
          <img src={wantedCreations.imgPath} alt="" />
          <p>{wantedCreations.title}</p>
        </div>
        </Link>
        
      );
    })
  ) 


  return (
    <div className="container">
      <div className ="d-flex">
<Link className=" justify-content-start mt-3 ml-2 " to = "/private"><img className="backIcons" src={backLogo} alt="backlogo"/></Link>
    
     <div className="logandedit">
       <Link className="m-3"  to="/private/edit-profile">
        Edit
      </Link>
       <Link  to={"/"} onClick={logout} id="home-btn">
          <img className="navIcons mr-3" src={logoutLogo} alt="Logout" />
        </Link>
      
      </div>
      </div> 
      <div className=" d-flex text-left align-items-center justify-content-center mt-3">
        <div className="">
          <img className="profileImg" src={finalUser.imgPath} alt="perfil" />
        </div>
        <div className="ml-2">
          <h5>
            <b>
              {finalUser.name} {finalUser.lastName}
            </b>
          </h5>
        </div>
      </div>
      <Link className="btn addCreation-btn m-4" to="/private/creation-form">
        Upload Creation
      </Link>
      <div>
      <div className="row btn-group">
        <div className="col m-2"> 
          <button
            onClick={() => {
              setBtnWants(false);
              setBtnHaves(true);
            }}
            className={havesBtn === true ? "btn btn-primary" : "btn btn-dark"}
          >
           Creations 
          </button>
          <br/>
          <span>{`(${displayHaveList && myCreations.haveList.length})`}</span>
        </div><div className="col m-2">
          <button
            onClick={() => {
              setBtnWants(true);
              setBtnHaves(false);
            }}
            className={wantsBtn === true ? "btn btn-primary" : "btn btn-dark"}
          >
            Wishes  
          </button>
          <span>{`(${displayWantList && myCreations.wantList.length})`}</span>
        </div>
      </div>

      </div>
      <div>
        <div
          id="haveList"
          className="row haveList d-flex justify-content-center"
        >
          {havesBtn && displayHaveList}
        </div>
        <div
          id="wantList"
          className="row wantList d-flex justify-content-center"
        >
          {wantsBtn && displayWantList}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profile);

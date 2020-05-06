import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";


const ModalDelete = (props) => {

 let deleteProduct = (e) => { 
      const { params } = props.match;
      const productId = params.id;
      const userId = props.user._id;
      const likeListToRemove = props.user.likeList;
      const filteredLikeList = [];
      likeListToRemove.forEach(obj => {
          console.log(productId, obj.productLiked, 'ñlcksdnckjsfnjkvsdfnkvjfs')
          if(productId === obj.productLiked){
            filteredLikeList.push(obj)
          }
      });
      console.log(filteredLikeList, 'filtered')
      axios.post(`http://localhost:4000/api/remove-product-link`, {userId, productId, filteredLikeList});
        // axios.delete(`http://localhost:4000/api/product/${productId}`);
      props.history.push("/private/profile")    
  }
  return <div>
      <h2 className ="text-center">¿Are you sure?</h2>
      <p className ="text-center">Pressing accept you are deleting your creation from your list</p>
      <div className="">
      <button className ="btn btn-danger m-2" type = "submit" onClick = {(e) => {deleteProduct(e)}}>Accept</button>
      <Link className ="btn btn-primary m-2" to ="/private/profile">Refuse</Link>
      </div>
  </div>;
};

export default withAuth(ModalDelete);

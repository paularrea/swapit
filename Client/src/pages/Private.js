import React from "react";
import { withAuth } from "../lib/AuthProvider";
import { Switch, Route } from "react-router-dom";

import Discover from "./Discover";
import Profile from "./MyProfile";
import Notifications from "./Notifications";
import EditProfile from "../components/EditProfile";
import EditProduct from "../components/EditProduct";
import AddProduct from "../components/AddProduct";
import ProductDetails from "../components/ProductDetails";
import ModalDelete from "../components/ModalDelete";
import UsersProfiles from "../pages/UsersProfiles";

const Private = () => {
  return (
    <div className="text-center  ">

      <div>
        <Switch>
          <Route exact path="/private" component={Discover} />
          <Route
            exact
            path="/private/notifications"
            component={Notifications}
          />
          <Route exact path="/private/profile" component={Profile} />
          <Route exact path="/private/edit-profile" component={EditProfile} />
          <Route exact path="/private/creation-form" component={AddProduct} />
          <Route exact path="/private/product-details/:id" component={ProductDetails} />
          <Route exact path="/private/product-delete/:id" component={ModalDelete} />
          <Route exact path="/private/edit-product/:id" component={EditProduct} />
          <Route exact path="/private/user-profile/:id" component={UsersProfiles} />
          
        </Switch>
      </div>
    </div>
  );
};

export default withAuth(Private);

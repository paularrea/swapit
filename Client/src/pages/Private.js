import React from "react";
import { withAuth } from "../lib/AuthProvider";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Discover from "./Discover";
import Profile from "./Profile";
import Notifications from "./Notifications";
import EditProfile from "../components/EditProfile";
import AddCreation from "../components/AddCreation";
import ProductDetails from "../components/ProductDetails";
import ModalDelete from "../components/ModalDelete";

const Private = () => {
  return (
    <div className="text-center  ">
      <div className ="d-flex justify-content-center">
        <Navbar />
      </div>
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
          <Route exact path="/private/creation-form" component={AddCreation} />
          <Route exact path="/private/product-details/:id" component={ProductDetails} />
          <Route exact path="/private/product-delete/:id" component={ModalDelete} />
          
        </Switch>
      </div>
    </div>
  );
};

export default withAuth(Private);

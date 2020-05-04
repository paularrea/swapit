import axios from "axios";
const service = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});
const errorHandler = (err) => {
  console.error(err);
  throw err;
};
export default {
  service,
  uploadCreation(newCreation) {
    return service
      .post("/product/addCreation", newCreation)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  profileUpdate(profileUpdate) {
    return service
      .put("/users/edit-profile", profileUpdate)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  addMember(object) {
    //necesito enviar al back la id del evento. la id de mi usuario
    return service
      .post("/events", object)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  deleteWant(object) {
    //necesito enviar al back la id del evento. la id de mi usuario
    return service
      .post("/products/remove-want", object)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getAllTheProducts() {
    return service
      .get("/allproducts")
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getMyProducts() {
    return service
      .get("/myProducts")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getWantedCreation(productId) {
    return service
      .post("/product/want", productId)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfo() {
    //necesito enviar al back la id del evento. la id de mi usuario
    return service
      .get("/profile")
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

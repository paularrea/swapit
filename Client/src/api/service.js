import axios from "axios";
const service = axios.create({
  baseURL: process.env.REACT_APP_API_URI +"/api",
    withCredentials: true
});
const errorHandler = (err) => {
  console.error(err);
  throw err;
};
export default {
  service,
  handleUpload(theFile) {
    return service
      .post("/upload", theFile)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  saveNewThing(newThing){
      return service.post("/events/create", newThing)
      .then(res => res.data)
      .catch(errorHandler)
  },
  profileUpdate(profileUpdate){
    return service.put("/profile/edit-profile", profileUpdate)
    .then(res => res.data)
    .catch(errorHandler)
},
addMember(object){
  //necesito enviar al back la id del evento. la id de mi usuario 
  return service.post("/events", object)
  .then(res => res.data)
  .catch(errorHandler)
},
deleteMember(object){
  //necesito enviar al back la id del evento. la id de mi usuario 
  return service.post("/events/remove-member", object)
  .then(res => res.data)
  .catch(errorHandler)
},
addMessage(object){
  //necesito enviar al back la id del evento. la id de mi usuario 
  return service.put("/events/message", object)
  .then(res => res.data)
  .catch(errorHandler)
},
getNotiInfo(){
  return service.get("/events/message")
  .then(res => res.data)
  .catch(errorHandler)
},


getUserInfo(){
  //necesito enviar al back la id del evento. la id de mi usuario 
  return service.get("/profile")
  .then(res => res.data)
  .catch(errorHandler)
},
};
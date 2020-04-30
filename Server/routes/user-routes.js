const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");


router.get("/profile", async (req, res, next) => {
  try{
    const userId = req.session.currentUser._id
    const userInfo =  await User.findById(userId)
   console.log(userInfo)
       res.json(userInfo);
  }catch(err){
    console.log(err)
  }
});
// router.get("/my-events/:id", async (req, res, next) => {
//   try{
//   const userId = req.params.id
//   myAccions = await User.findById(userId).populate("myAccions");
//   // console.log(myAccions)
//   res.json(myAccions)
//   }catch(err){
//   res.json(err)
//   }
// });

router.get("/users", async (req, res, next) => {
  try{
    const allUsers=  await User.find() 
   console.log(allUsers)
       res.json(allUsers);
  }catch(err){
    console.log(err)
  }
});

// router.get("/allprofiles", (req, res, next) => {
//   User.find()
//     .then((allTheUsers) => {
//       res.json(allTheUsers);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// router.get('/profile/:id', (req, res, next)=>{
//     if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       res.status(400).json({ message: 'Specified id is not valid' });
//       return;
//     }
//     User.findById(req.params.id) 
//       .then(response => {
//         res.status(200).json(response);
//       })
//       .catch(err => {
//         res.json(err);
//       })
//   })
  router.put('/users/edit-profile', (req, res, next)=>{
    const {name, _id, lastName, imgPath} = req.body
    console.log(req.body, 'req body')
    if(!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    User.findByIdAndUpdate(_id, {name, lastName, imgPath})
      .then((res) => {
        console.log(_id, req.body, 'CONSOLE')
        res.json({ message: `users with ${_id} is updated successfully.` });
      })
      .catch(err => {
        res.json(err);
      })
  })
module.exports = router;
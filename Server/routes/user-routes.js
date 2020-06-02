const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");

router.get("/profile", async (req, res, next) => {
  const userId = req.session.currentUser._id;
  try {
    const userInfo = await User.findById(userId);
    res.json(userInfo);
  } catch (err) {
    console.log(err);
  }
});
router.post("/notifications", async (req, res, next) => {
  let userId = req.body;
  try {
    let notiInfo = await User.find({ _id: userId._id })
      .populate("likeList.userWhoLikes")
      .populate("likeList.productLiked");
    res.json(notiInfo);
  } catch (err) {
    res.json(err);
  }
});

router.put("/notifications", async (req, res, next) => {
  let userId = req.body._id;
  let notiUpdate = req.body.notifications;
  await User.update({ _id: userId}, {likeList: notiUpdate});
  res.json({ message: `users notifications are updated successfully.` });
  try {
  } catch (err) {
    res.json(err);
  }
});

// router.put("/notifications", async (req, res, next) => {
//   let userId = req.body._id;
//   let notiUpdate = req.body.notifications;

//   await User.updateMany({ likeList: notiUpdate });
//   res.json({ message: `users notifications are updated successfully.` });
//   // });
//   try {
//   } catch (err) {
//     res.json(err);
//   }
// });

router.get("/myProducts", async (req, res, next) => {
  let userId = req.session.currentUser._id;
  try {
    let productList = await User.find({ _id: userId })
      .populate("wantList")
      .populate({
        path: "haveList",
        model: "Product",
        populate: {
          path: "interestedUser",
          model: "User",
        },
      });
    res.json(productList);
  } catch (err) {
    res.json(err);
  }
});

router.get("/user-profile/:id", async (req, res, next) => {
  const userProfileId = req.params.id;
  try {
    const userInfo = await User.findById(userProfileId).populate("haveList");
    res.json(userInfo);
  } catch (err) {
    console.log(err);
  }
});

router.get("/users", async (req, res, next) => {
  try { 
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
});

router.put("/users/edit-profile", (req, res, next) => {
  const { name, _id, lastName, imgPath } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findByIdAndUpdate(_id, { name, lastName, imgPath })
    .then((res) => {
      res.json({ message: `users with ${_id} is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isLoggedIn = require("../helpers/middlewares");
const Product = require("../models/Product");
const User = require("../models/User");

router.get("/allproducts", (req, res, next) => {
  Product.find()
    .then((allproducts) => {
      res.json(allproducts);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/product/addCreation", async (req, res, next) => {
  const userId = req.session.currentUser._id;
  try {
    const newCreation = await Product.create(req.body);
    res.status(200).json(newCreation);
    await User.findByIdAndUpdate(userId, {
      $push: { haveList: newCreation._id },
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/products/remove-want", async (req, res, next) => {
  const productId = req.body.productId;
  const likeListId = req.body.likeListId;
  const creatorId = req.body.creatorId;
  const userId = req.session.currentUser._id;
  
  try {
    await Product.updateOne(
      { _id: productId },
      { $pull: { interestedUser: userId } }
    );

    await User.updateOne({ _id: userId }, { $pull: { wantList: productId } });
    await User.updateOne(
      { _id: creatorId },
      {
        $pull: {
          likeList: {
            productLiked: likeListId.productLiked,
            userWhoLikes: likeListId.userWhoLikes,
            _id: likeListId._id,
          },
        },
      }
    );
    res.status(200).json("deleted from your wantList");
  } catch (err) {
    console.log(err);
  }
});

router.post("/product/want", async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const id = req.body._id;
  try {
    const newWantProduct = await User.findByIdAndUpdate(userId, {
      $push: { wantList: id },
    });
    const interested = await Product.findByIdAndUpdate(id, {
      $push: { interestedUser: userId },
    });
    let productSelected = await Product.findById(id);
    const likeList = await User.findByIdAndUpdate(productSelected.creator, {
      $push: { likeList: { userWhoLikes: userId, productLiked: id }},
    });
    
    res.status(200).json(newWantProduct, interested, likeList);
  } catch (err) {
    console.log(err);
  }
});

router.post("/remove-product-link", async (req, res, next) => {

  const userId = req.body.userId;
  const productId = req.body.productId;
  const likeListToRemove = req.body.filteredLikeList;
  try {
    likeListToRemove.map(async (listToRemove) => {
     await User.updateOne(
        { _id: userId },
        {
          $pull: {
            likeList: {
              productLiked: listToRemove.productLiked,
              userWhoLikes: listToRemove.userWhoLikes,
              _id: listToRemove._id,
            },
          },
        }
        );
        res.json(`links removed succesfully`);
    });

    await User.updateMany({ $pull: { wantList: productId } });

  } catch (err) {
    console.log(err);
  }
});

router.get("/product/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Product.findById(req.params.id)
    .populate("creator")
    .populate("interestedUser")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});



router.put("/edit-product/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  console.log(req.body, "info");
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `product with ${req.params.id} is updated successfully.`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/product/:id", async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  const removeProductId = req.params.id;
  try {
    await Product.findByIdAndRemove(removeProductId);

    res.json(`the product ${removeProductId} is been removed`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

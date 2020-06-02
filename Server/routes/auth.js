const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require("../helpers/middlewares");

//  POST '/signup'

router.post(
  "/signup",
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, password, name, lastName } = req.body;

    try {
      const usernameExists = await User.findOne({ username }, "username");
      if (usernameExists) return next(createError(400));
      else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          username,
          password: hashPass,
          name,
          lastName,
        });

        req.session.currentUser = newUser;
        res.status(200).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    
    const { username, password } = req.body;
    
      const user = await User.findOne({ username });

      if (!user) {
       
        
        res.status(404)
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        req.session.save();
       
        res.status(200).json(user);
        return;
      } else {
        res.status(404).json('Wrong Password')
      }
    
  }
);

router.post("/logout", isLoggedIn(), (req, res, next) => {
  req.session.destroy();

  res.status(204).send();
  return;
});

router.get("/private", isLoggedIn(), (req, res, next) => {
  res.status(200).json({ message: "Test - User is logged in" });
});
router.get("/me", isLoggedIn(), (req, res, next) => {
  req.session.currentUser.password = "*";
  res.json(req.session.currentUser);
});


module.exports = router;

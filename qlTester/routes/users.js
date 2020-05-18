const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const passport = require("passport");
const utils = require("../lib/utils");
const base64url = require("base64url");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log(JSON.stringify(req.headers));
    const id = req.headers["authorization"].split(".")[1];
    console.log(id);
    let temp = JSON.parse(base64url.decode(id)).sub;
    console.log(temp);

    res.status(200).json({ success: true, msg: "You are authorized" });
  }
);

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(404).json({ success: false, msg: "could not find user" });
      }
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          user: user,
          token: tokenObject.token,
          expires: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => next(err));
});

// TODO
router.post("/register", (req, res, next) => {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });

  newUser
    .save()
    .then((user) => {
      // const id = user.id
      const jwt = utils.issueJWT(user);

      res.json({
        success: true,
        user: user,
        token: jwt,
        expiresIn: jwt.expires,
      });
    })
    .catch((err) => next(err));
});
module.exports = router;

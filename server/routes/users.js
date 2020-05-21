const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const passport = require("passport");
const utils = require("../lib/utils");
const base64url = require("base64url");
var cors = require("cors");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "cse356warmup3@gmail.com",
    pass: "Cse356warmup", // naturally, replace both with your real credentials or an application-specific password
  },
});

/* GET users listing. */
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
router.use("*", cors());
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

router.get('/123',(req,res)=>{

  return res.json({"hong zheng":"okay"})
})

router.post("/email", (req, res) => {
  console.log(req.body.email)

   User.findOne({ email: req.body.email }).then((user) => {
     if (user) {

const token = utils.issueJWT(user);
// const host = "http://34.86.220.228/";
const host = "http://localhost:3001";

  const link = host+'/change_password/'+req.body.email + "/" + token.token.split(' ')[1];
// let text=''
  const html = "<a href=" + link + ">" + 'click this link to reset your password for email '+req.body.email + "</a>";
  // console.log(link)
  console.log(html);
  // console.log(typeof token.token);
  
  const mailOptions = {
    from: "vindication@enron.com",
    to: req.body.email,
    subject: "password changing request",
    html: html,
  };
  transporter.sendMail(mailOptions);
  return res.json({ "hong zheng": "okay", token: "true" });


     }
     else{
        return res.status(400).json({ token: "false" });
     }
   });
 
});
router.post('/123',(req,res)=>{
// console.log('t')
  return res.json({"hong zheng":"okay"})
})
router.post("/login", cors(),(req, res, next) => {
  // console.log(1234)
  // console.log(req.body)
  // return res.json({"hong zheng":"okay"})
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return    res.status(404).json({ token:"false",reason:"email"});

      }
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);
       return res.status(200).json({
          success: true,
          user: user,
          token: tokenObject.token,
          expires: tokenObject.expires,
        });
      } else {
        return    res.status(401).json({ token:"false",reason:"password"});
      }
    })
    .catch((err) => next(err));
});

router.post(
  "/change_password",
  // passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    User.findOneAndUpdate(
      { email: req.body.email },
      {
        salt: salt,
        hash: hash,
      }
    ).then((user) => {
      console.log(user);
    });

    return res.status(200).json({ token: "ok" });
  }
);

// TODO
router.post("/register", (req, res, next) => {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
    email:req.body.email
  });


  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return    res.status(400).json({ token:"false"});

      }})

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

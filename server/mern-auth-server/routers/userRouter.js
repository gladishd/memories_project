const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
router.post("/", async (req, res) => {
  try {
    const {
      email,
      username, // destructure username from the user model
      password,
      passwordVerify
    } = req.body;

    //validation
    if (!email || !username || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (username.length < 2)
      return res.
        status(400)
        .json({ errorMessage: "Please enter a username of at least 2 characters." });

    if (password.length < 6)
      return res
        .status(400)
        .json({
          errorMessage: "Please enter a password of at least 6 characters."
        });

    if (password !== passwordVerify)
      return res
        .status(400)
        .json({
          errorMessage: "Please make sure the passwords match."
        });

    const existingEmail = await User.findOne(
      {
        email
      }
    );
    const existingUsername = await User.findOne(
      {
        username
      }
    );

    if (existingEmail)
      return res
        .status(400)
        .json({
          errorMessage: "An account with this email already exists."
        });

    if (existingUsername)
      return res
        .status(400)
        .json({
          errorMessage: "An account with this username already exists."
        });

    //hash pswrd
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the database
    const newUser = new User({
      email, username, passwordHash
    });

    const savedUser = await newUser.save();

    //sign the token
    const token = jwt.sign({
      user: savedUser._id
    }, process.env.JWT_SECRET);

    //send the token in a HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
    }).send();

  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    //validate
    if (!email || !password) // username will be under display!
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res
        .status(401)
        .json({ errorMessage: "The email or password is incorrect." });

    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
    if (!passwordCorrect)
      return res
        .status(401)
        .json({ errorMessage: "The email or password is incorrect." });

    //sign the token
    const token = jwt.sign({
      user: existingUser._id
    }, process.env.JWT_SECRET);

    //send the token in a HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
    }).send();


  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (error) {
    console.error(error);
    res.json(false);
  }
});




module.exports = router;

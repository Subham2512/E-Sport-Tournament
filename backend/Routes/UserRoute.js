import express from "express";
import User from "../models/User.js";
import multer from "multer";
import bcrypt from "bcrypt";
import Passport from "passport";
import PassportJWT from "passport-jwt";
import jwt from "jsonwebtoken";
// import Constants from "../Constant.js";
import parseCookies from "../CookieParser.js";
import Wallet from "../models/Wallet.js";
import AuthTokenMiddleware from "../Middleware/AuthTokenMiddleware.js";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const JwtStrategy = PassportJWT.Strategy;
const ExtractJwt = PassportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

Passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // You might want to check if the user exists in the database
    // and call 'done' with user details if found
    // 'jwtPayload' contains the decoded JWT payload
    done(null, jwtPayload);
  })
);
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });

const router = express.Router();

var loggedUser = null;

router.get("/login", AuthTokenMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", loggedUser: loggedUser });
});

router.post("/check-user-exist", async (req, res) => {
  const { type, value } = req.body;
  try {
    let user;
    if (type === "username") {
      user = await User.findOne({ username: value });
    } else if (type === "email") {
      user = await User.findOne({ email: value });
    } else if (type === "mobile") {
      user = await User.findOne({ mobile: value });
    } else {
      return res.status(400).json({ message: "Invalid type provided." });
    }

    if (user) {
      return res.status(401).json({ message: `${type} not available!` });
    } else {
      return res.status(200).json({ message: `${type} available!` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
});

router.post("/get-user-profile", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      return res.json({
        user,
      });
    } else {
      return res.status(401).json({ message: "User not found!" });
    }
  } catch (error) {
    return console.error(error);
  }
});

router.post("/update-email", async (req, res) => {
  const { userId, newEmail } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/update-image", upload.single("image"), async (req, res) => {
  const { userId } = req.body;
  const image = {
    name: req.file.originalname,
    uri: req.file.buffer,
    type: req.file.mimetype,
  };
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.image = image;
    await user.save();

    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/update-password", async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/Register", async (req, res) => {
  console.log(req.body);
  const { name, username, email, mobile, password, dob } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      mobile,
      password: hashedPassword,
      dob,
    });
    await newUser.save();

    const userWallet = new Wallet({
      username: username,
      balance: 0,
      userId: newUser._id,
    });

    await userWallet.save();
    const payload = { id: newUser._id, username: newUser.username };
    const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  const token = parseCookies(req.headers.cookie);
  if (token.token) {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  }

  return res.status(400).json({ message: "No token found" });
});

router.post("/Login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    loggedUser = user.username;
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.json({ token: token, id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

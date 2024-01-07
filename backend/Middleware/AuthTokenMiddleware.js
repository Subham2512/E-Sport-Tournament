import jwt from "jsonwebtoken";
// import Constants from "../Constant.js";
import parseCookies from "../CookieParser.js";
import dotenv from "dotenv";

dotenv.config();

const AuthTokenMiddleware = (req, res, next) => {
  //   console.log(req.headers.cookie);
  try {
    const token = parseCookies(req.headers.cookie);
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token.token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    // res.status(400).send("Invalid token");
  }
};

export default AuthTokenMiddleware;

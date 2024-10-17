// const {promisify} = require('util');
const User = require("./../models/user.model");
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcryptjs')
// const sendEmail = require('./../utils/email');
// const APPERROR = require('./../utils/ErrorHandler');
require("dotenv").config();

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      statusCode: 400,
      Status: "Failed",
      message: "Please provide email and password",
    });
    return next();
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(400).json({
      Status: "Failed",
      message: "Incorrect Username and Password",
    });
    return next();
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2m",
  });
  res.status(200).json({
    Status: "Success",
    user_id: user.email,
    token,
  });
};

exports.protect = async (req, res, next) => {
  // check if the token exists
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        Status: "Login First",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    let freshUser = await User.findOne({ _id: decoded.id });
    req.user = freshUser;
    next();
  } catch (error) {
    res.status(403).json({
      Status: "Invalid Token",
    });
  }
};

const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json({
      status: "Success",
      results: user.length,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",

      Message: {
        Error: "could not find your req" + err,
      },
    });
  }
};
exports.createUser = async (req, res) => {
  console.log("request ....", req.body.name);

  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(201).json({
      statusCode: 201,
      Status: "Success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Server error",
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      statusCode: 200,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "User with this id was not found",
    });
  }
};

exports.udateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

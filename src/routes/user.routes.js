const express = require("express");
const usersControllers = require("../controllers/users.controllers");

const router = express.Router();

router
  .get("/users", usersControllers.getAllUsers)
  .post("/users", usersControllers.createUser)
  .get("/users/:id", usersControllers.getUser);

module.exports = router;

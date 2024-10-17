import express from "express";

import * as usersControllers from "../controllers/users.controllers";

const usersRouter = express.Router();

usersRouter
  .get("/users", usersControllers.getAllUsers)
  .post("/users", usersControllers.createUser)
  .get("/users/:id", usersControllers.getUser);

export default usersRouter;

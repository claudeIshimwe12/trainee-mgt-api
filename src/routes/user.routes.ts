import express from "express";

import * as usersControllers from "../controllers/users.controllers";
import * as authControllers from "../controllers/auth.controllers";

const usersRouter = express.Router();

usersRouter
  .get("/users", authControllers.protect, usersControllers.getAllUsers)
  .post("/users", usersControllers.createUser)
  .get("/users/:id", usersControllers.getUser)
  .get("/auth/me", authControllers.getMe);

export default usersRouter;

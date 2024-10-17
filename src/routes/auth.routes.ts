import express from "express";
const authControllers = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post("/login", authControllers.login);

export default authRouter;

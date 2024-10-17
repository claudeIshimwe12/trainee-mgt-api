import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import usersRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", usersRouter);
app.use("/api/v1/auth", authRouter);

export default app;

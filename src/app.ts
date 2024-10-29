import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import docs from "./../swagger.json";

import usersRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
app.use("/api/v1", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

export default app;

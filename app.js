const express = require("express");
const cors = require("cors");
// import cors from "cors";
const usersRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
// Use Cors
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", usersRoutes);
app.use("/api/v1/auth", authRoutes);

module.exports = app;

const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.ATLAS_CON_STRING).then(() => {
  console.log("DB connected");
});

app.listen(3004, function () {
  console.log("the server is running on port 3004");
});

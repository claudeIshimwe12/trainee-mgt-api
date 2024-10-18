import app from "./app"; // Use ES module imports
import mongoose from "mongoose"; // Import mongoose
import dotenv from "dotenv"; // Import dotenv for loading environment variables

// Load environment variables from .env file
dotenv.config();

// Ensure that the MongoDB connection string exists and is of type string
const dbConnectionString: string | undefined = process.env.LOCAL_DB;

if (!dbConnectionString) {
  console.error(
    "MongoDB connection string not defined in environment variables"
  );
  process.exit(1); // Exit the process if the connection string is missing
}

// Connect to MongoDB using mongoose
mongoose
  .connect(dbConnectionString)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

// Start the server on port 3004
app.listen(3004, () => {
  console.log("The server is running on port 3004");
});

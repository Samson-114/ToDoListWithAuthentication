require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB/db");
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());
const PORT = 8080;

app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/task", auth, taskRoute);

app.listen(process.env.PORT || 8080, async () => {
  try {
    await connectDB(process.env.mongoURI);
    console.log("connected to database...");
  } catch (error) {
    console.log(error);
  }

  console.log(`Server Connected to port ${PORT}...`);
});

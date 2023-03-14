const mongoose = require("mongoose");

const connectDB = async (url) => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;

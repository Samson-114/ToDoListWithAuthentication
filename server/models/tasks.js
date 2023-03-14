const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please task name"],
  },
  done: {
    type: Boolean,
    default: false,
  },
  userid: {
    type: String,
  },
});

const Task = mongoose.model("task", UserSchema);
module.exports = Task;

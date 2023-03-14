const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");

router.route("/").post(createTask);
router.route("/:userId").get(getTasks);
router.route("/:taskId").patch(updateTask).delete(deleteTask);

module.exports = router;

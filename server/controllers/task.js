const Task = require("../models/tasks");
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      name: req.body.task,
      userid: req.user.userId,
    });
    console.log(task);
    res.json({ msg: "task created", task }).status(200);
  } catch (error) {
    res.json({ msg: "task cannot be crated" });
  }
};

const getTasks = async (req, res) => {
  const userId = req.user.userId;
  try {
    const tasks = await Task.find({ userid: userId });
    res.json({ msg: "tasks get", tasks }).status(200);
  } catch (error) {
    res.json({ msg: "tasks cannot be get" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.find({ _id: req.params.taskId });
    await Task.updateOne({ _id: req.params.taskId }, { done: !task.done });
    res.status(200).json({ msg: "task is updated" });
  } catch (error) {
    res.json({ msg: "tasks cannot be update" });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.taskId });
    res.status(200).json({ msg: "task is deleted" });
  } catch (error) {
    res.json({ msg: "tasks cannot be deleted" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };

import taskModel from "../models/taskModel.js";

const getAllTasks = async (req, res) => {
  try {
    const { search, isActive } = req.query;
    const queryObject = {
      createdBy: req.body.userId
  }
    if (isActive) {
      queryObject.isActive = isActive;
    }
    if (search) {
      queryObject.taskTitle = { $regex: search, $options: "i" };
    }
    let result = taskModel.find(queryObject);
    result = result.sort("-createdAt");
    const tasks = await result;
    res.status(200).send({
      message: "All Tasks fetched successfully",
      success: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching tasks data ",
      error,
    });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    res.status(200).send({
      message: "Task fetched successfully",
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching tasks data ",
      error,
    });
  }
};

const addTask = async (req, res) => {
  try {
    req.body.createdBy = req.body.userId;
    const newTask = await taskModel.create(req.body);
    res.status(200).send({ message: "Task added successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while adding task",
      error,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).send({
      message: "Task updated successfully",
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating task",
      error,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete({ _id: req.params.id });
    res
      .status(200)
      .send({ message: "Task deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting task",
      error,
    });
  }
};

const bulkDelete = async (req, res) => {
  try {
    const task = await taskModel.deleteMany();
    res
      .status(200)
      .send({ message: "All Task deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting all tasks",
      error,
    });
  }
};

export { getAllTasks, getTask, addTask, updateTask, deleteTask, bulkDelete };

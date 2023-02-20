import express from "express";
import {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  bulkDelete
} from "../controllers/taskController.js";

const router = express.Router();

router.route("/alltasks").get(getAllTasks);
router.route("/getTask/:id").get(getTask);
router.route("/addTask").post(addTask);
router.route("/editTask/:id").patch(updateTask);
router.route("/deleteTask/:id").delete(deleteTask);
router.route("/deleteAllTasks").delete(bulkDelete);


export default router;

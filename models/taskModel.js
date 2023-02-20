import mongoose from "mongoose";

const taskScheema = new mongoose.Schema(
  {
    taskTitle: {
      type: String,
      maxlength: 50,
      unique: true,
    },
    taskDescription: {
      type: String,
      maxlength: 256,
    },
    isActive: {
      type: Boolean,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("tasks", taskScheema);

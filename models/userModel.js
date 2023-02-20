import mongoose from "mongoose";

const UserScheema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a user name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    trim: true,
  },
});

export default mongoose.model("Users", UserScheema);

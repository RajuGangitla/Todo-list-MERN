import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(200).send({ message: "User already existed", success: false });
    }
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const user = await new userModel(req.body);
    await user.save();
    res
      .status(201)
      .send({ message: "User successfully created", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Register controller ${error.message}`,
      success: false,
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    if (!isMatch) {
      res
        .status(200)
        .send({ message: "Invalid email or password", success: false });
    } else {
      res
        .status(200)
        .send({ message: "Login Successfully", user, token, success: true });
    }
  } catch (error) {
    res.status(500).send({
      message: `Login controller ${error.message}`,
      success: false,
    });
  }
};

export { register, login };

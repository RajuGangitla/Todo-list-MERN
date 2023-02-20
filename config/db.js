import mongoose from "mongoose";

const connectDb = async () => {
  try {
    return await mongoose.connect(process.env.MONGO_URL, () =>
      console.log("Db connected")
    );
  } catch (error) {
    console.log(error)
  }
};

export default connectDb;

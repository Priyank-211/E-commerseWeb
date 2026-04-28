import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) { //check if already connected 0-disconnected 1-connected 2-connecting 3-de=isconnecting  //fix maxlistner warning
    console.log("Already connected to DB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI); //if not connected it connect to the databases
    console.log("DB Connected");
  } catch (error) { // handles errror
    console.log(error);
    process.exit(1); //crash app if not connected better to crashappp without the databsses
  }
};

export default connectDB;

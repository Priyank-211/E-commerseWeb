import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";

const registerAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin", salt);

    const db = mongoose.connection.useDb("test"); // Or whatever default DB is used
    const userModel = db.model("user", new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cartData: { type: Object, default: {} },
    }, { minimize: false }));

    const exists = await userModel.findOne({ email: "admin@baba.com" });
    if (exists) {
        console.log("Admin already exists as a user!");
    } else {
        await userModel.create({
            name: "Admin",
            email: "admin@baba.com",
            password: hashedPassword,
        });
        console.log("Admin registered successfully in the database!");
    }
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

registerAdmin();

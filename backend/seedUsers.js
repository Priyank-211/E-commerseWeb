import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import userModel from "./models/userModel.js";

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const testUsers = [
      { name: "John Doe", email: "john@test.com", password: hashedPassword },
      { name: "Jane Smith", email: "jane@test.com", password: hashedPassword },
    ];

    for (const user of testUsers) {
      const exists = await userModel.findOne({ email: user.email });
      if (!exists) {
        await userModel.create(user);
        console.log(`Created test user: ${user.name} (${user.email})`);
      } else {
        console.log(`User ${user.email} already exists.`);
      }
    }

    console.log("Test users seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedUsers();

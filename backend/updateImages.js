import mongoose from "mongoose";
import "dotenv/config";
import productModel from "./models/productModel.js";

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    const products = await productModel.find({});
    for (let product of products) {
      let updated = false;
      const newImages = product.image.map(img => {
        if (img.includes('http://localhost:5174')) {
          updated = true;
          return img.replace('http://localhost:5174', 'http://localhost:5175');
        }
        return img;
      });

      if (updated) {
        product.image = newImages;
        await product.save();
        console.log(`Updated images for product: ${product.name}`);
      }
    }

    console.log("Image URLs update complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating images:", error);
    process.exit(1);
  }
};

updateImages();

import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";
import path from "path";
import productModel from "./models/productModel.js";

// Ensure no spaces break the env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME ? process.env.CLOUDINARY_NAME.trim() : "",
  api_key: process.env.CLOUDINARY_API_KEY ? process.env.CLOUDINARY_API_KEY.trim() : "",
  api_secret: process.env.CLOUDINARY_SECRET_KEY ? process.env.CLOUDINARY_SECRET_KEY.trim() : "",
});

const uploadImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB. Starting Cloudinary upload...");

    const products = await productModel.find({});
    
    for (let product of products) {
      let updated = false;
      let newImages = [];

      for (let img of product.image) {
        // If image is a local url
        if (img.includes("localhost")) {
          const fileName = img.split("/").pop();
          const localPath = path.resolve("../frontend/src/assets", fileName);

          if (fs.existsSync(localPath)) {
            console.log(`Uploading ${fileName} for ${product.name}...`);
            try {
              const result = await cloudinary.uploader.upload(localPath, {
                resource_type: "image",
              });
              newImages.push(result.secure_url);
              updated = true;
            } catch (uploadError) {
              console.error(`Failed to upload ${fileName}:`, uploadError.message);
              newImages.push(img);
            }
          } else {
            console.log(`File not found: ${localPath}`);
            newImages.push(img);
          }
        } else {
          // Keep existing non-localhost image
          newImages.push(img);
        }
      }

      if (updated) {
        product.image = newImages;
        await product.save();
        console.log(`✅ Saved Cloudinary URLs for: ${product.name}`);
      }
    }

    console.log("🎉 All local images have been migrated to Cloudinary!");
    process.exit(0);
  } catch (error) {
    console.error("Error connecting to DB or processing:", error);
    process.exit(1);
  }
};

uploadImages();

import fs from 'fs';
import mongoose from 'mongoose';
import 'dotenv/config';

// We need to define the schema to insert
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

const seedDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    // Clear existing dummy products to prevent duplicates
    await productModel.deleteMany({});
    console.log("Cleared existing products");

    // Read the assets.js file
    const assetsFile = fs.readFileSync("../frontend/src/assets/assets.js", "utf-8");

    // Extract the products array string
    const startIndex = assetsFile.indexOf("export const products = [");
    if (startIndex === -1) throw new Error("Could not find products array");
    
    let productsStr = assetsFile.substring(startIndex + "export const products = ".length);
    
    // Replace p_img variables with actual string URLs pointing to the Vite dev server
    // For example: p_img1 -> "http://localhost:5174/src/assets/p_img1.png"
    productsStr = productsStr.replace(/p_img(\d+_\d+|\d+)/g, (match) => {
      return `"http://localhost:5174/src/assets/${match}.png"`;
    });

    // Evaluate the string to get the array of objects
    // We use Function instead of eval for slightly better safety
    const getProducts = new Function(`return ${productsStr}`);
    const productsArray = getProducts();

    // Clean up _id so MongoDB generates a real ObjectId, otherwise we might get cast errors
    const cleanedProducts = productsArray.map(p => {
      const { _id, ...rest } = p;
      return rest;
    });

    // Insert into DB
    await productModel.insertMany(cleanedProducts);
    console.log(`Successfully seeded ${cleanedProducts.length} products!`);
    
    process.exit(0);
  } catch (error) {
    console.log("Error seeding:", error);
    process.exit(1);
  }
};

seedDb();

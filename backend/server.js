import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinnary.js";
import userRouter from "./routes/userRoutes.js";

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares

app.use(express.json());
app.use(cors());

//api ens Points
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Api Working heheee");
});

app.listen(port, () => console.log("server started oon PORT:" + port));

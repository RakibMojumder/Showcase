import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
dotEnv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Databse connected");
  } catch (error) {
    console.log(error);
  }
};

connectDatabase();

// Middlewares routes
app.use("/api", authRoutes);

app.listen(PORT, () => console.log(`Server is listing on port ${PORT}`));

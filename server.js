import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import users from "./routes/users.js";

dotenv.config();

const app = express();
app.use(express.json());
// ✅ Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // frontend origin
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(users);

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

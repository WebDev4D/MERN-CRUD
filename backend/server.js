import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", movieRoutes);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./utility/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
  connectDatabase();
});
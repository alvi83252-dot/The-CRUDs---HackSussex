// load environment variables
import dotenv from "dotenv";
dotenv.config();

// core dependencies
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

// import route groups
import reportRoutes from "./routes/reportRoutes.js";
import binRoutes from "./routes/binRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import guestRoutes from "./routes/guestRoutes.js"

const app = express();
app.use(cors()); // allows frontend to call backend
app.use(express.json({ limit: "10mb" })); // parse JSON bodies (images may be base64)

// Connect to DigitalOcean MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB (DigitalOcean) Connected!"))
.catch((err) => console.error("MongoDB Error:", err));

// Register API routes
app.use("/api/reports", reportRoutes);
app.use("/api/bins", binRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("api/users", userRoutes);
app.use("/api/guest", guestRoutes);

// Start server
app.listen(process.env.PORT, () => 
console.log('Backend is successfully running on port ${process.env.PORT}')
);
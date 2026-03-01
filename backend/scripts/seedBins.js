import dotenv from "dotenv";
import mongoose from "mongoose";
import Bin from "../models/Bin.js";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to Mongo");

  await Bin.deleteMany({});

  const bins = [
    { name: "Brighton Pier Bin", type: "general", lat: 50.8195, lng: -0.1364 },
    { name: "Churchill Square Recycling", type: "recycling", lat: 50.8225, lng: -0.1460 },
    { name: "Seafront Glass Bin", type: "glass", lat: 50.8180, lng: -0.1500 }
    // add more if you want
  ].map((b) => ({ ...b, lastUpdated: new Date() }));

  await Bin.insertMany(bins);
  console.log("Seeded bins:", bins.length);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
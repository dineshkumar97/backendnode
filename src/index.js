import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { setServers } from "node:dns/promises";
import userDetailsRouter from "./routes/userDetailsRouter.js";
setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
const mongooseString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api-learn/user", userDetailsRouter);



mongoose.connect(mongooseString)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log('Error received = ' + err);
  });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})



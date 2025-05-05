import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";
import channelRoutes from "./routes/ChannelRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    // origin: function (origin, callback) {
    //   if (!origin || origin === "http://localhost:5173") {
    //       callback(null, true);
    //   } else {
    //       callback(new Error("Not allowed by CORS"));
    //   }
  //},
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));//we are tellin the express server that whenever some user comes to this route and calls an image the we need to serve the asset from our directory to the request
app.use("/uploads/files", express.static("uploads/files"));
app.use(cookieparser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

setupSocket(server);
mongoose
  .connect(databaseURL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err.message));

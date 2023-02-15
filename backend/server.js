import express from "express";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import cors from "cors";
import productRouter from "./routes/product.js";
import errorHandler from "./middleware/error.js";
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  forbiddenErrorHandler,
  genericServerErrorHandler
} from "./errorHandlers.js";
import path from "path";
import userRouter from "./routes/user.js";
import reviewRouter from "./routes/review.js";
import orderRouter from "./routes/order.js";
import paymentRouter from "./routes/payment.js";

const server = express();

const port = process.env.PORT || 3001;

// const __dirname = path.resolve();

// ************************* MIDDLEWARES ********************************

const whiteList = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.some(allowedUrl => allowedUrl === origin)) {
      callback(null, true);
    } else {
      const error = new Error("Not allowed by cors!");
      error.status = 403;
      callback(error);
    }
  },
  credentials: true
};

server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(cookieParser());

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(fileUpload());

// ************************* ERROR MIDDLEWARES ********************************
server.use(errorHandler);
server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(forbiddenErrorHandler);
server.use(genericServerErrorHandler);

// ************************* Routes *******************************
server.use("/", productRouter);
server.use("/", reviewRouter);
server.use("/register", userRouter);
server.use("/", userRouter);
server.use("/", orderRouter);
server.use("/", paymentRouter);

if (process.env.NODE_ENV === "production") {
  server.use(express.static("../frontend/build"));
}
// server.use(express.static(path.join(__dirname, "../frontend/build")));

// server.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// ************************* Mongo Connection *******************************
mongoose.connect(process.env.MONGO_CONNECTION);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on port ${port}`);
  });
});
mongoose.connection.on("error", () => {
  console.log("error");
});

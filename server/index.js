import express from "express";

import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import Router from "./Routers/router.js";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 requests per windowMs
  message: "Rate limit exceeded. Please try again later.",
});
app.use(limiter);

// Routers
app.use("/", Router);

//  start the server

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

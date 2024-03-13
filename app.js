import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { AppError } from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import userRouter from "./routes/userRoutes.js";

export const app = express();

// GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());

app.use(
  express.json({
    limit: "10kb",
  })
);

// ROUTES
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

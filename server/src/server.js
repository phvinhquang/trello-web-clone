import express from "express";
import { C0NNECT_DB, CLOSE_DB } from "./config/mongodb.js";
import exitHook from "async-exit-hook";
import boardRoutes from "./routes/v1/boardRoutes.js";
import columnRoutes from "./routes/v1/columnRoutes.js";
import cardRoutes from "./routes/v1/cardRoutes.js";
import { corsOptions } from "./config/cors.js";
import "dotenv/config";
import cors from "cors";

const hostname = "localhost";
const port = 5000;

const app = express();
app.use(cors(corsOptions));

// To parse body json data
app.use(express.json());

app.use("/", (res, res) => {
  res.send("<h1>Welcome to Trello API</h1>");
});
app.use("/v1", boardRoutes);
app.use("/v1", columnRoutes);
app.use("/v1", cardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong on the server",
    stack: err.stack || "No stack :(",
  };

  if (process.env.BUILD_MODE !== "dev") delete error.stack;

  res.status(error.statusCode).json(error);
});

app.listen(port, hostname);

// Clean up trước khi dừng server
exitHook(() => {
  CLOSE_DB();
});

// Kết nối tới database xong mới kích hoạt app
C0NNECT_DB(() => {
  if (process.env.BUILD_MODE !== "dev") {
    app.listen(5000);
  }

  if (process.env.BUILD_MODE !== "prod") {
    app.listen(process.env.PORT);
  }
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

// 65b8bbadbd99c5a75fcdf35d
// 65b8c49ba8ad9a31a2b89cda

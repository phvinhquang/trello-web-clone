import express from "express";
import { mapOrder } from "./utils/sorts.js";
import { GET_DB, C0NNECT_DB, CLOSE_DB } from "./config/mongodb.js";
import exitHook from "async-exit-hook";
import boardRoutes from "./routes/v1/index.js";

const app = express();

const hostname = "localhost";
const port = 8017;

app.use("/v1", boardRoutes);

app.listen(port, hostname);

// Clean up trước khi dừng server
exitHook(() => {
  CLOSE_DB();
});

// Kết nối tới database xong mới kích hoạt app
C0NNECT_DB(() => {
  app.listen(5000);
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

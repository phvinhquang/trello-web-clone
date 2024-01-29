import express from "express";
import { GET_DB, C0NNECT_DB, CLOSE_DB } from "./config/mongodb.js";
import exitHook from "async-exit-hook";
import boardRoutes from "./routes/v1/index.js";

const app = express();

const hostname = "localhost";
const port = 8017;

// To parse body json data
app.use(express.json());

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
  .then(() => {})
  .catch((err) => {
    console.log(err);
    process.exit();
  });

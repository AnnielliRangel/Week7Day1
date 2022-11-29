import express from "express";
import * as dotenv from "dotenv";
import processoRoute from "./routes/processo.routes.js";
import connect from "./config/db.config.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/processo", processoRoute);
connect();

// o servidor roda
app.listen(process.env.PORT, () => {
  console.log(
    `App up and running on port http://localhost:${process.env.PORT}`
  );
});

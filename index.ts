import express from "express";
import bodyParser from "body-parser";
import { userRouter } from "./src/routes/User.routes";

const app = express();

app.use(bodyParser.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

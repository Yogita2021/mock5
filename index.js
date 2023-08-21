const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { auth } = require("./middleware/auth");
const { docterRoute } = require("./routes/doctor.route");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("I am a server");
});

app.use("/user", userRouter);

app.use(auth);
app.use("/docter", docterRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db at port 8000");
  } catch (error) {
    console.log(error);
  }
});

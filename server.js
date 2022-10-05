const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://nargiz:TJs8EvLYoatpqkNs@cluster0.0j2opo0.mongodb.net/users",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected"));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(3000, () => console.log("Server started"));
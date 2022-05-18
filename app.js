const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const dbConfig = require("../configs/db.config");
const user = require("./models/user.model");
const serverConfig = require("../configs/server.config");
const constants = require("./utils/constants");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes")(app);

// setup the mongoDB connection and create on ADMIN user

mongoose.connect(dbConfig.DB_URL, async () => {
  console.log("MongoDB connected");

  await user.collection.drop(); // since this dev setup

  const user = await User.create({
    name: "Sanjay Verma",
    userId: "admin",
    password: bcrypt.hashSync("Welcome1", 10),
    address: "Ambernath, Thane Mumbai",
    userType: constants.userType.admin,
  });
  console.log("Admin created", user);
});

// start the express server

app.listen(serverConfig.PORT, () => {
  console.log("Application has started on port- 8081", serverConfig.PORT);
});

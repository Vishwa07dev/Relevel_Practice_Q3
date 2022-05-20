const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const User = require("./models/user.model");
const serverConfig = require("./configs/server.config");
const constants = require("./utils/constants");
const bcrypt = require("bcryptjs");
const Hospital = require("./models/hospital.model");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes")(app);

/**
 * Setup the mongodb connection and create on ADMIN user
 */
mongoose.connect(dbConfig.DB_URL, async () => {
    console.log("MongoDB connected");

    await User.collection.drop();// Since this a dev setup
    await Hospital.collection.drop();
    const user = await User.create({
        name: "Vishwa Mohan",
        userId: "admin",
        password: bcrypt.hashSync("Welcome1", 8),
        address: "Balendur, Bangalore",
        userType: constants.userType.admin
    });
    console.log("admin created", user);
})

/**
 * Start the express server
 */
app.listen(serverConfig.PORT, () => {
    console.log("Application has started on the port ", serverConfig.PORT);
})
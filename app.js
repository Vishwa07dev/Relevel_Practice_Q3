const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const constants = require("./utils/constants");
const bcrypt = require("bcryptjs");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes")(app);


mongoose.connect(dbConfig.DB_URL, () => {
     console.log(`Connecting to MongoDB...`);
     console.log(`Connection Successful`);
   
     init();
});

const init = async () => {

     var user = await User.findOne({userId: "admin"});

     if(user) {
          return;
     }
     //Create the admin Role
     user = await User.create({
          name: "Uday",
          userId: "admin",
          email: "admin@email.com",
          userType: "ADMIN",
          password: bcrypt.hashSync("password", 8)
     });  
     console.log("Admin role created");
}


app.listen(serverConfig.PORT, () => {
    console.log(`Get Fit App listening on port ${serverConfig.PORT}`);
})
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes")(app);


mongoose.connect(dbConfig.DB_URL, async () => {
     console.log(`Connecting to MongoDB...`);
     console.log(`Connection Successful`);
   
  init();
});

const init = async () => {

     console.log(`Checking if admin exist...`);

     var user = await User.findOne({type: "admin"});

     if(user) {
          console.log(`Admin already exists, returning...`)
          return;
     }
     console.log(`Creating admin role...`);
     var user = await User.create({
          name: "Uday",
          userId: "admin",
          type: "ADMIN",
          address: "Marthon Valley, MARS",
          password: bcrypt.hashSync("password", 8)
     });  
     console.log("Admin role created", user);
}

app.listen(serverConfig.PORT, () => {
    console.log(`Get Fit App listening on port ${serverConfig.PORT}`);
})
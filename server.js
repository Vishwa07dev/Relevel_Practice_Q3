const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');

const db_config = require('./configs/db.config');
const server_config = require('./configs/server.config');

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// routing paths
require('./routes/index.route')(app);

/**
 * Connecting mongodb
 */
mongoose.connect(db_config.db_url, () => {
    console.log("Mongodb connected.");
    // init();
});

// async function init() {
//     const user = await 
// }

/**
 * Starting the server
 */

app.listen(server_config.PORT, () => {
    console.log("Server up and running on port:", server_config.PORT);
})
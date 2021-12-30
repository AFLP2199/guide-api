const express = require("express");
const config = require("config");
const app = express();

require("express-async-errors"); //patches routes with try catch blocks
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")(app);

// PORT
const port = process.env.PORT || config.get("port");
const stringToLog = `Server up and running on PORT : ${port}`;
const server = app.listen(port, console.log(stringToLog));

module.exports = server;

const express = require('express');
const view = express();
const PORT = process.env.PORT || 3001;
const path = require("path");


// Routes HTML



view.listen(PORT, console.log("Server view start for port: " + PORT));

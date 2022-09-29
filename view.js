const express = require('express');
const view = express();
const PORT = process.env.PORT || 3001;
const path = require("path");


// Routes HTML

view.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
view.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
view.get('/cave-a-vin/index.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
view.get('/pages/blancs.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/pages/blancs.html'));
});
view.get('/pages/rouges.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/pages/rouges.html'));
});


// Routes CSS

view.get('/styles/index.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles/index.css'));
});
view.get('/cave-a-vin/styles/blancs.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles/blancs.css'));
});
view.get('/cave-a-vin/styles/rouges.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles/rouges.css'));
});


// Routes JS

view.get('/cave-a-vin/gestionVin.js', function(req, res) {
    res.sendFile(path.join(__dirname, './gestionVin.js'));
});

view.listen(PORT, console.log("Server view start for port: " + PORT));

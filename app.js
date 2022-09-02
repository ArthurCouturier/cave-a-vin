const express = require('express');
express.static.mime.define({'text/plain': ['json']});
const fs = require("fs");
const app = express();
// changer le serveur express pour mettre sur freebox: https://www.npmjs.com/package/freebox-sdk-js
const PORT = process.env.PORT || 3000;
const {access} = require("fs");
const {query} = require("express");



app.use(function(req, res, next) {  // https://stackoverflow.com/questions/56194474/how-to-pass-information-from-node-js-to-html
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());





// BLANCS

function getVinsBlancs() {
    require('./ressources/blancs.json');
    const vinsBlancsJSON = fs.readFileSync('./ressources/blancs.json');
    const vinsBlancs = JSON.parse(vinsBlancsJSON);
    return vinsBlancs;
}

app.get('/blancs', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    console.log(access);
    res.json(getVinsBlancs());
    next();
});

app.get('/ajouterBlanc', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    var cepage =  req.query.cepage;
    var domaine = req.query.domaine;
    var vinsBlancsJSON = fs.readFileSync('./ressources/blancs.json');
    var vinsBlancs = JSON.parse(vinsBlancsJSON);
    vinsBlancs.Cepage[cepage][domaine] += 1;
    vinsBlancsJSON = JSON.stringify(vinsBlancs);
    fs.writeFileSync('./ressources/blancs.json', vinsBlancsJSON);
    res.json(getVinsBlancs());
    next();
})

app.get('/retirerBlanc', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    var cepage =  req.query.cepage;
    var domaine = req.query.domaine;
    var vinsBlancsJSON = fs.readFileSync('./ressources/blancs.json');
    var vinsBlancs = JSON.parse(vinsBlancsJSON);
    vinsBlancs.Cepage[cepage][domaine] -= 1;
    vinsBlancsJSON = JSON.stringify(vinsBlancs);
    fs.writeFileSync('./ressources/blancs.json', vinsBlancsJSON);
    res.json(getVinsBlancs());
    next();
})

app.get('/enregistrerCepageBlanc', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    var nomNouveauCepage = req.query.cepage;
    var vinsBlancsJSON = fs.readFileSync('./ressources/blancs.json');
    var vinsBlancs = JSON.parse(vinsBlancsJSON);
    var cepages = vinsBlancs.Cepage;
    for (var c in cepages) {
        if (c == nomNouveauCepage) {
            //res.json(getVinsBlancs());
            next();
        }
    }
    cepages[nomNouveauCepage] = {};
    vinsBlancsJSON = JSON.stringify(vinsBlancs);
    fs.writeFileSync('./ressources/blancs.json', vinsBlancsJSON);
    next();
})

app.get('/enregistrerCommandeBlanc', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    var newCepage = req.query.cepage;
    var newDomaine = req.query.domaine;
    var newQuantite = req.query.quantite;
    var vinsBlancsJSON = fs.readFileSync('./ressources/blancs.json');
    var vinsBlancs = JSON.parse(vinsBlancsJSON);
    cepage = vinsBlancs.Cepage[newCepage];
    cepage[newDomaine] = parseInt(newQuantite);
    vinsBlancsJSON = JSON.stringify(vinsBlancs);
    fs.writeFileSync('./ressources/blancs.json', vinsBlancsJSON);
    next();
})





// ROUGES

app.listen(PORT, console.log("Server cave start for port: " + PORT));

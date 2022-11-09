const express = require('express');
express.static.mime.define({'text/plain': ['json']});
const fs = require("fs");
const app = express();
// changer le serveur express pour mettre sur freebox: https://www.npmjs.com/package/freebox-sdk-js
// Sur la livebox: https://communaute.orange.fr/t5/Trucs-et-astuces/Comment-définir-une-quot-IP-fixe-quot-sur-le-réseau-local-d-une/ta-p/634804
const PORT = process.env.PORT || 80;
const {access} = require("fs");
const path = require("path");



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

// Route pour obtenir la liste des vins blancs
app.get('/blancs', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    console.log(access);
    res.json(getVinsBlancs());
    next();
});

// Route permettant d'ajouter une quantité d'un vin blanc pré-enregistré
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

// Route permettant de retirer une quantité d'un vin blanc pré-enregistré
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

// Route permettant d'enrigistrer un nouveau cépage
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

// Route permettant d'enregistrer une nouvelle commande de blanc
app.get('/enregistrerCommandeBlanc', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    const newCepage = req.query.cepage;
    const newDomaine = req.query.domaine;
    const newQuantite = req.query.quantite;
    let vinsBlancsJSON = fs.readFileSync('./ressources/blancs.json');
    const vinsBlancs = JSON.parse(vinsBlancsJSON);
    let cepage = vinsBlancs.Cepage[newCepage];
    cepage[newDomaine] = parseInt(newQuantite);
    vinsBlancsJSON = JSON.stringify(vinsBlancs);
    fs.writeFileSync('./ressources/blancs.json', vinsBlancsJSON);
    next();
})





// ROSES

function getVinsRoses() {
    require('./ressources/roses.json');
    const vinsRosesJSON = fs.readFileSync('./ressources/roses.json');
    const vinsRoses = JSON.parse(vinsRosesJSON);
    return vinsRoses;
}

// Route pour obtenir la liste des vins roses
app.get('/roses', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    console.log(access);
    res.json(getVinsRoses());
    next();
});

// Route permettant d'ajouter une quantité d'un vin rose pré-enregistré
app.get('/ajouterRose', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    var cepage =  req.query.cepage;
    var domaine = req.query.domaine;
    var vinsRosesJSON = fs.readFileSync('./ressources/roses.json');
    var vinsRoses = JSON.parse(vinsRosesJSON);
    vinsRoses.Cepage[cepage][domaine] += 1;
    vinsRosesJSON = JSON.stringify(vinsRoses);
    fs.writeFileSync('./ressources/roses.json', vinsRosesJSON);
    res.json(getVinsRoses());
    next();
})

// Route permettant de retirer une quantité d'un vin rose pré-enregistré
app.get('/retirerRose', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    var cepage =  req.query.cepage;
    var domaine = req.query.domaine;
    var vinsRosesJSON = fs.readFileSync('./ressources/roses.json');
    var vinsRoses = JSON.parse(vinsRosesJSON);
    vinsRoses.Cepage[cepage][domaine] -= 1;
    vinsRosesJSON = JSON.stringify(vinsRoses);
    fs.writeFileSync('./ressources/roses.json', vinsRosesJSON);
    res.json(getVinsRoses());
    next();
})

// Route permettant d'enrigistrer un nouveau cépage
app.get('/enregistrerCepageRose', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    var nomNouveauCepage = req.query.cepage;
    var vinsRosesJSON = fs.readFileSync('./ressources/roses.json');
    var vinsRoses = JSON.parse(vinsRosesJSON);
    var cepages = vinsRoses.Cepage;
    for (var c in cepages) {
        if (c == nomNouveauCepage) {
            //res.json(getVinsRoses());
            next();
        }
    }
    cepages[nomNouveauCepage] = {};
    vinsRosesJSON = JSON.stringify(vinsRoses);
    fs.writeFileSync('./ressources/roses.json', vinsRosesJSON);
    next();
})

// Route permettant d'enregistrer une nouvelle commande de rouge
app.get('/enregistrerCommandeRose', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    const newCepage = req.query.cepage;
    const newDomaine = req.query.domaine;
    const newQuantite = req.query.quantite;
    let vinsRosesJSON = fs.readFileSync('./ressources/roses.json');
    const vinsRoses = JSON.parse(vinsRosesJSON);
    let cepage = vinsRoses.Cepage[newCepage];
    cepage[newDomaine] = parseInt(newQuantite);
    vinsRosesJSON = JSON.stringify(vinsRoses);
    fs.writeFileSync('./ressources/roses.json', vinsRosesJSON);
    next();
})





// ROUGES

function getVinsRouges() {
    require('./ressources/rouges.json');
    const vinsRougesJSON = fs.readFileSync('./ressources/rouges.json');
    const vinsRouges = JSON.parse(vinsRougesJSON);
    return vinsRouges;
}

// Route pour obtenir la liste des vins rouges
app.get('/rouges', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    console.log(access);
    res.json(getVinsRouges());
    next();
});

// Route permettant d'ajouter une quantité d'un vin rouge pré-enregistré
app.get('/ajouterRouges', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    var cepage =  req.query.cepage;
    var domaine = req.query.domaine;
    var vinsRougesJSON = fs.readFileSync('./ressources/rouges.json');
    var vinsRouges = JSON.parse(vinsRougesJSON);
    vinsRouges.Cepage[cepage][domaine] += 1;
    vinsRougesJSON = JSON.stringify(vinsRouges);
    fs.writeFileSync('./ressources/rouges.json', vinsRougesJSON);
    res.json(getVinsRouges());
    next();
})

// Route permettant de retirer une quantité d'un vin rouge pré-enregistré
app.get('/retirerRouge', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    var cepage =  req.query.cepage;
    var domaine = req.query.domaine;
    var vinsRougesJSON = fs.readFileSync('./ressources/rouges.json');
    var vinsRouges = JSON.parse(vinsRougesJSON);
    vinsRouges.Cepage[cepage][domaine] -= 1;
    vinsRougesJSON = JSON.stringify(vinsRouges);
    fs.writeFileSync('./ressources/rouges.json', vinsRougesJSON);
    res.json(getVinsRouges());
    next();
})

// Route permettant d'enrigistrer un nouveau cépage
app.get('/enregistrerCepageRouge', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    var nomNouveauCepage = req.query.cepage;
    var vinsRougesJSON = fs.readFileSync('./ressources/rouges.json');
    var vinsRouges = JSON.parse(vinsRougesJSON);
    var cepages = vinsRouges.Cepage;
    for (var c in cepages) {
        if (c == nomNouveauCepage) {
            //res.json(getVinsRouges());
            next();
        }
    }
    cepages[nomNouveauCepage] = {};
    vinsRougesJSON = JSON.stringify(vinsRouges);
    fs.writeFileSync('./ressources/rouges.json', vinsRougesJSON);
    next();
})

// Route permettant d'enregistrer une nouvelle commande de rouge
app.get('/enregistrerCommandeRouge', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    const newCepage = req.query.cepage;
    const newDomaine = req.query.domaine;
    const newQuantite = req.query.quantite;
    let vinsRougesJSON = fs.readFileSync('./ressources/rouges.json');
    const vinsRouges = JSON.parse(vinsRougesJSON);
    let cepage = vinsRouges.Cepage[newCepage];
    cepage[newDomaine] = parseInt(newQuantite);
    vinsRougesJSON = JSON.stringify(vinsRouges);
    fs.writeFileSync('./ressources/rouges.json', vinsRougesJSON);
    next();
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/cave-a-vin/index.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/pages/blancs.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/pages/blancs.html'));
});
app.get('/pages/roses.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/pages/roses.html'));
});
app.get('/pages/rouges.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/pages/rouges.html'));
});


// Routes CSS

app.get('/styles/index.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles/index.css'));
});
app.get('/cave-a-vin/styles/blancs.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles/blancs.css'));
});
app.get('/cave-a-vin/styles/roses.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles/roses.css'));
});
app.get('/cave-a-vin/styles/rouges.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles/rouges.css'));
});


// Routes JS

app.get('/cave-a-vin/gestionVin.js', function(req, res) {
    res.sendFile(path.join(__dirname, './gestionVin.js'));
});

// Ecoute
app.listen(PORT, console.log("Server cave start for port: " + PORT));

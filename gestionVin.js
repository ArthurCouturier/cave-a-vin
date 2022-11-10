const URL = "http://191.96.53.174";

async function chargerListeVins(type) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    };
    xhttp.onreadystatechange = function() { // Donner le callback
        if (this.readyState == 4 && this.status == 200) {
            afficherListeVins(this.responseText, type);
        }
    };
    xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/'+type);
    xhttp.setRequestHeader('Content-Type', 'application/javascript');
    xhttp.send();
    return;
}

async function afficherListeVins(listeJSON, type) {
    document.getElementById("listeVins").innerHTML = "";
    var liste = JSON.parse(listeJSON);
    var listeVinsHTML = "<ul>";
    var cepagesHTML = "";
    for (var cepage in liste.Cepage) {
        listeVinsHTML += "<b>" + cepage + ": " + "</b>" + "<ul>";
        cepagesHTML += "<option value='"+cepage.toString()+"'>"+cepage.toString()+"</option>";
        for (var domaine in liste.Cepage[cepage]) {
            boutonMoins = " <input class='boutonsPlusMoins' type='button' value='-' onclick='retirerVin(\""+cepage+"\", \""+domaine+"\", \""+type+"\")'>"
            boutonPlus = "<input class='boutonsPlusMoins' type='button' value='+' onclick='ajouterVin(\""+cepage+"\", \""+domaine+"\", \""+type+"\")'>"
            listeVinsHTML += "<li>" + domaine + ": " + liste.Cepage[cepage][domaine] + boutonMoins + boutonPlus + "</li>";
        }
        listeVinsHTML += "</ul>";
    }
    document.getElementById("choixCepages").innerHTML = cepagesHTML;
    listeVinsHTML += "</ul>"
    document.getElementById("listeVins").innerHTML = listeVinsHTML;
}

function retirerVin(cepage, domaine, type) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    };
    xhttp.onreadystatechange = function() { // Donner le callback
        if (this.readyState == 4 && this.status == 200) {
            afficherListeVins(this.responseText, type);
        }
    };
    if (type == 'blancs') {
        xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/retirerBlanc?cepage='+cepage+'&domaine='+domaine);
    } else if (type == 'roses') {
        xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/retirerRose?cepage='+cepage+'&domaine='+domaine);
    } else if (type == 'rouges') {
        xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/retirerRouge?cepage='+cepage+'&domaine='+domaine);
    }
    xhttp.setRequestHeader('Content-Type', 'application/javascript');
    xhttp.send();
    return;
}

function ajouterVin(cepage, domaine, type) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    };
    xhttp.onreadystatechange = function() { // Donner le callback
        if (this.readyState == 4 && this.status == 200) {
            afficherListeVins(this.responseText, type);
        }
    };
    if (type == 'blancs') {
        xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/ajouterBlanc?cepage='+cepage+'&domaine='+domaine);
    } else if (type == 'roses') {
        xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/ajouterRose?cepage='+cepage+'&domaine='+domaine);
    } else if (type == 'rouges') {
        xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/ajouterRouge?cepage='+cepage+'&domaine='+domaine);
    }
    xhttp.setRequestHeader('Content-Type', 'application/javascript');
    xhttp.send();
    return;
}

function enregistrerNouvelleCommande() {
    if (document.getElementById("nouveauVinDomaine").value != "") {
        if (document.getElementById("nouveauVinQuantite").value == "") {
            document.getElementById("nouveauVinQuantite").value = 0;
        }
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
        };
        xhttp.onreadystatechange = function() { // Donner le callback
            if (this.readyState == 4 && this.status == 200) {
                chargerListeVins(type);
                location.reload();
            }
        };
        const cepage = document.getElementById("choixCepages").value;
        const domaine = document.getElementById("nouveauVinDomaine").value;
        const quantite = document.getElementById("nouveauVinQuantite").value;
        console.log(cepage, domaine, quantite);
        if (type ==  'blancs') {
            xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/enregistrerCommandeBlanc?cepage='+cepage+"&domaine="+domaine+"&quantite="+quantite);
        } else if (type == 'rouges') {
            xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/enregistrerCommandeRouge?cepage='+cepage+"&domaine="+domaine+"&quantite="+quantite);
        } else if (type == 'roses') {
            xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/enregistrerCommandeRose?cepage='+cepage+"&domaine="+domaine+"&quantite="+quantite);
        }
        xhttp.setRequestHeader('Content-Type', 'application/javascript');
        xhttp.send();
        return;
    }
}

function enregistrerNouveauCepage() {
    if (document.getElementById("nomNouveauCepage").value != "") {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
        };
        xhttp.onreadystatechange = function() { // Donner le callback
            if (this.readyState == 4 && this.status == 200) {
                chargerListeVins(type);
                location.reload();
            }
        };
        if (type == 'blancs') {
            xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/enregistrerCepageBlanc?cepage='+document.getElementById("nomNouveauCepage").value);
        } else if (type == 'rouges') {
            xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/enregistrerCepageRouge?cepage='+document.getElementById("nomNouveauCepage").value);
        } else if (type == 'roses') {
            xhttp.open('GET', 'http://'+URL+':80/cave-a-vin/enregistrerCepageRose?cepage='+document.getElementById("nomNouveauCepage").value);
        }
        xhttp.setRequestHeader('Content-Type', 'application/javascript');
        xhttp.send();
        return;
    }
}

var bouttonNewCommande = document.getElementById("enregistrerNouvelleCommandeBouton");
bouttonNewCommande.addEventListener("click", enregistrerNouvelleCommande);
var bouttonNewCepage = document.getElementById("enregistrerNouveauCepageBouton");
bouttonNewCepage.addEventListener("click", enregistrerNouveauCepage);

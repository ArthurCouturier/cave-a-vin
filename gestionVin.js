async function chargerListeVins() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    };
    xhttp.onreadystatechange = function() { // Donner le callback
        if (this.readyState == 4 && this.status == 200) {
            afficherListeVins(this.responseText);
        }
    };
    xhttp.open('GET', 'http://localhost:3000/blancs');
    xhttp.setRequestHeader('Content-Type', 'application/javascript');
    xhttp.send();
    return;
}

async function afficherListeVins(listeJSON) {
    document.getElementById("listeVins").innerHTML = "";
    var liste = JSON.parse(listeJSON);
    var listeVinsHTML = "<ul>";
    var cepagesHTML = "";
    for (var cepage in liste.Cepage) {
        listeVinsHTML += "<b>" + cepage + ": " + "</b>" + "<ul>";
        cepagesHTML += "<option value='"+cepage.toString()+"'>"+cepage.toString()+"</option>";
        for (var domaine in liste.Cepage[cepage]) {
            boutonMoins = " <input class='boutonsPlusMoins' type='button' value='-' onclick='retirerVin(\""+cepage+"\", \""+domaine+"\")'>"
            boutonPlus = "<input class='boutonsPlusMoins' type='button' value='+' onclick='ajouterVin(\""+cepage+"\", \""+domaine+"\")'>"
            listeVinsHTML += "<li>" + domaine + ": " + liste.Cepage[cepage][domaine] + boutonMoins + boutonPlus + "</li>";
        }
        listeVinsHTML += "</ul>";
    }
    document.getElementById("choixCepages").innerHTML = cepagesHTML;
    listeVinsHTML += "</ul>"
    document.getElementById("listeVins").innerHTML = listeVinsHTML;
}

function retirerVin(cepage, domaine) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    };
    xhttp.onreadystatechange = function() { // Donner le callback
        if (this.readyState == 4 && this.status == 200) {
            afficherListeVins(this.responseText);
        }
    };
    xhttp.open('GET', 'http://localhost:3000/retirerBlanc?cepage='+cepage+'&domaine='+domaine);
    xhttp.setRequestHeader('Content-Type', 'application/javascript');
    xhttp.send();
    return;
}

function ajouterVin(cepage, domaine) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    };
    xhttp.onreadystatechange = function() { // Donner le callback
        if (this.readyState == 4 && this.status == 200) {
            afficherListeVins(this.responseText);
        }
    };
    xhttp.open('GET', 'http://localhost:3000/ajouterBlanc?cepage='+cepage+'&domaine='+domaine);
    xhttp.setRequestHeader('Content-Type', 'application/javascript');
    xhttp.send();
    return;
}

async function enregistrerNouvelleCommande() {
    if (document.getElementById("nouveauVinDomaine").value != "") {
        if (document.getElementById("nouveauVinQuantite").value == "") {
            document.getElementById("nouveauVinQuantite").value = 0;
        }
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
        };
        xhttp.onreadystatechange = function() { // Donner le callback
            if (this.readyState == 4 && this.status == 200) {
                chargerListeVins();
                location.reload();
            }
        };
        var cepage = document.getElementById("choixCepages").value;
        var domaine = document.getElementById("nouveauVinDomaine").value;
        var quantite = document.getElementById("nouveauVinQuantite").value;
        xhttp.open('GET', 'http://localhost:3000/enregistrerCommandeBlanc?cepage='+cepage+"&domaine="+domaine+"&quantite="+quantite);
        xhttp.setRequestHeader('Content-Type', 'application/javascript');
        xhttp.send();
        return;
    }
}

var bouttonNewCommande = document.getElementById("enregistrerNouvelleCommande");
bouttonNewCommande.addEventListener("click", enregistrerNouvelleCommande);

async function enregistrerNouveauCepage() {
    if (document.getElementById("nomNouveauCepage").value != "") {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
        };
        xhttp.onreadystatechange = function() { // Donner le callback
            if (this.readyState == 4 && this.status == 200) {
                chargerListeVins();
                location.reload();
            }
        };
        xhttp.open('GET', 'http://localhost:3000/enregistrerCepageBlanc?cepage='+document.getElementById("nomNouveauCepage").value);
        xhttp.setRequestHeader('Content-Type', 'application/javascript');
        xhttp.send();
        return;
    }
}

var bouttonNewCepage = document.getElementById("enregistrerNouveauCepage");
bouttonNewCepage.addEventListener("click", enregistrerNouveauCepage);


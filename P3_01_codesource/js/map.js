    // CREATION DE LA MAP VIA UN OBJET
let MaMap = {
  
  
  surligne:function(champ, erreur)
  {
   if(erreur)
      champ.style.backgroundColor = "#fba";
   else
      champ.style.backgroundColor = "";
  },



verifPseudo:function (champ) {
 
 if(champ.value.length < 2 || champ.value.length > 25)
 {
  MaMap.surligne(champ, true);
    return false;
 }
 else
 {
  MaMap.surligne(champ, false);
    return true;
 }
},


verifPrenom:function (champ)
{
 if(champ.value.length < 2 || champ.value.length > 25)
 {
  MaMap.surligne(champ, true);
    return false;
 }
 else
 {
  MaMap.surligne(champ, false);
    return true;
 }
},


verifForm :function (f)
{
 
 let pseudoOk = MaMap.verifPseudo(f.pseudo);
 let prenomOk = MaMap.verifPseudo(f.prenom);
 
 if(pseudoOk && prenomOk) {
   
    blocBas.style.display="block";
  return true;
 }

  
 else
 {
   // alert("Veuillez remplir tous les champs");
    return false;
  
 }

},


     // ON INITIALISE LA MAP
  initCoord: function (Lat, Lng, api) {
       // Affichage de la map
    
    let map = new google.maps.Map(document.getElementById("map"), {
      center: new google.maps.LatLng(Lat, Lng),
      zoom: 13,

    }); // FIN affichage Map

       // METHODE DE RECUPERATION DES DONNEES API JC DECAUX
    ajaxGet(api, function (reponse) {
      const stations = JSON.parse(reponse);
          // DECLARATION DU TABLEAU POUR LES MARKERS
      this.markers = [];

         // BOUCLE AFIN DE PARCOURIR LE TABLEAU
      stations.forEach(function (station) {
        let panneau;

        if (station.status ==='CLOSED') {
          panneau = 'red';
        }// fin du 1er if
        else if (station.status ==='OPEN') {
          if (station.available_bikes > 0) {
            panneau = 'green';
          } // fin du if dans else if
          else if (station.available_bikes === 0) {
            panneau = 'orange';   // ATTENTION A NE PAS METTRE TROIS '=' mais un seul
          } // fin du 2nd else if
      
        } // fin du else if


            // AFFICHAGE DE MARKER
        this.marker = new google.maps.Marker({
          position: station.position,
          title: station.name,
          icon: '../images/' + panneau + '.png',
          map: map
        }); // fin mettre markers

        // initialiser les variables
    
        const stationInfo = document.getElementById("stationInfo");
        const nomStationElt = document.getElementById("nomStation");
        const adresseElt = document.getElementById("address");
        const etatElt = document.getElementById("status");
        const placeElt = document.getElementById("place");
        const bikeElt = document.getElementById("bike");
        const reservationElt = document.getElementById("reservation");
        const capaciteElt = document.getElementById("capacite");
        const conclusionElt = document.getElementById("conclusion");
        const btnInsert = document.getElementById("btnInsert");
        const isOutput = document.getElementById("isOutput");
        const btnReservez=document.getElementById('reserver');
        const annulerReservation= document.getElementById("annulerReservation");
        

        //METTRE SESSION STORAGE
        if (sessionStorage.getItem("autosave")) {
          champ.value = sessionStorage.getItem("autosave");
        }

        champ.addEventListener("change", function() {
        sessionStorage.setItem("autosave", champ.value);
        });
          
     
        // mettre INFOBULLES
        const infoWindowOptions = {
          content: '<h3>Détail de la station</h3>'
          + 'Adresse : ' + station.address +", "
          + station.available_bikes + 'vélo(s) disponible(s)'
        }; // fin infobulles

        //GENERER LES BULLES
        const infoWindow = new google.maps.InfoWindow(infoWindowOptions);
        google.maps.event.addListener(this.marker,'click', function() {
        infoWindow.open(map, this.marker);                                           // Attention au this
        }); // fin du marker qui s affiche quand on click
      


        marker.addListener("click", function () {
         MonInitialisation.affichage1();
     
      
         nomStationElt .innerHTML = " " + station.name; 
         adresseElt.innerHTML = " " + station.address;
     
         if (station.status === "OPEN") {
             etatElt.innerHTML = "La station est ouverte";
         } else {
             etatElt.innerHTML = "La station est fermée";
         }
     
             capaciteElt.innerHTML = station.bike_stands;
             placeElt.innerHTML = " " + station.available_bike_stands + " place(s) disponible(s)";
             bikeElt.innerHTML = " " + station.available_bikes + " vélo(s) disponible(s)";
     
         if (station.available_bikes === 0) {
             btnInsert.style.opacity = "0.7"; 
             btnInsert.disabled = true;  
         
         } else {
             btnInsert.style.opacity = "1";
             btnInsert.disabled = false;
     
         }
     
         sessionStorage.setItem('address', station.address);
     
          }); // fin marker.addListener

        
        
btnInsert.addEventListener('click', function() {
  MonInitialisation.takeLocalData();
  reservationElt.style.display = 'block'; 
  stationInfo.style.display = 'block'; 
  btnReservez.style.display="block";
  btnReservez.disabled=true;
  const champsV = sessionStorage.getItem("address");
  const recupNom=  localStorage.getItem("Nom");
  const recupPrenom=  localStorage.getItem("Prenom");
  isOutput.innerHTML = `Merci ${recupPrenom} ${recupNom}  , votre vélo est réservé à la station : ${champsV} `;
  
});


annulerReservation.addEventListener('click', function() {
  annulerReservation.innerHTML = 'Vous avez annulé votre réservation';
  MonTimer.stop();
  monCanvas.effacer();

})

btnReservez.addEventListener('click', function() {
  conclusionElt.style.display = 'block'; 
  annulerReservation.innerHTML = 'Annuler';
  btnReservez.style.display="none";
  MonTimer = new Timer (20);
}); 

            // PUSH LES MARKERS DANS LE TABLEAU
        this.markers.push(this.marker);
      }); // fin boucle forEach

      // ON DECLARE CHEMIN DES MARKERS
      const markerCluster = new MarkerClusterer (map, this.markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
      }) // fin markerClusterer
    }) // fin AJAXGET
  } //fin initCoord



} // fin MaMap



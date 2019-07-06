// //Affichage de la carte Google   
// class Carte {
//     constructor() {
//         this.lat = 45.757,
//         this.lng= 4.85,
//         this.zoom = 13;
//        // this.urlApi = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=b3f3dffd90d017cc424e6b909d8b33d30b8d61ff';
//         this.map = new google.maps.Map(document.getElementById('map'),{
//             zoom:this.zoom,
//             center:{lat:this.lat, lng: this.lng}
//         })
        
//     }
// }

class Station {
    constructor () {
        this.adress=adress;
        this.nBplaces=nBplaces;
        this.nBbikes=nBbikes;
    }
}


function initMap() {
//   let affichage = new Carte;
  
let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.757, lng: 4.85},  // coord. de Lyon
    zoom: 13 // niveau de zoom sur la ville

});



  // Récupération des stations avec l'API (utiliser la clef)
  ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=b3f3dffd90d017cc424e6b909d8b33d30b8d61ff', function (reponse) {
      // On change la réponse de la requête ajax en un tableau d'objets JavaScript. Il faut le parcourir à l'aide d'une boucle 'for'.
      const stations = JSON.parse(reponse);
      const markers = []; 
    
      //Récupération des données (station) à l'aide de la boucle
      stations.forEach(function (station) {
          //Le panneau changera : station ouverte ou non + si vélo disponible ou non (opérateur d'égalité)
          let panneau;
          if (station.status === 'CLOSED') { // CLOSED est un élément du fichier JSON voir site JC DECAUX
              panneau = 'red';
          } else if (station.status === 'OPEN') {
              if (station.available_bikes > 0) {
                  panneau = 'green';
              } else if (station.available_bikes === 0) {
                   panneau = 'orange';
              }
          }
          // Positionner la liste des stations  // voir tuto : https://www.datavis.fr/index.php?page=google-marker
          const marker = new google.maps.Marker({
              position: {lat: station.position.lat, lng: station.position.lng}, //position : la position du marker toujours avec l'objet google.maps.LatLng
              icon: '../images/' + panneau + '.png',
              map: map// map: la map sur laquelle on veut placer notre marker
              //A Voir sur le tuto pour afficher une image et du texte au survol de la souris
          }); 
         
        

        const divEtape1 = document.getElementById("etape1");    
        const divStation = document.getElementById("station-info");
        const adresseElt = document.getElementById("address");
        const etatElt = document.getElementById("status");
        const placeElt = document.getElementById("place");
        const bikeElt = document.getElementById("bike");
        //const bookElt = document.getElementById("book"); // Bouton Réserver
        const divReservation = document.getElementById("reservation");
        const divConfirmation = document.getElementById("confirmation");
        const divAnnuler = document.getElementById("annuler");
        const signatureElt = document.getElementById("canvas");
        const dashBoard = document.getElementById("dashboard");
        const capaciteElt = document.getElementById("capacite");
       
  /*    EXERCIE LOCALSTORAGE */
          const inpKey = document.getElementById("inpKey");
          const inpValue = document.getElementById("inpValue");
          const btnInsert = document.getElementById("btnInsert");
          const isOutput = document.getElementById("isOutput");


          btnInsert.onclick = function () {
              const key=inpKey.value;
              const value=inpValue.value;

           
          
        if(key && value) {
            localStorage.setItem(key,value);
            location.reload();
        }
    };
        for (let i = 0; i<localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            isOutput.innerHTML += `${key}: ${value}`;
        }
    
    

// DEBUT Pour afficher des bulles sur les markers
        const infoWindowOptions = {
            content: '<h3>Détail de la station</h3>'
            + 'Adresse : ' + station.address 
            + station.available_bikes + 'vélo(s) disponible(s)'
        };
    


        const infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
        });
// FIN Pour afficher des bulles sur les markers


        marker.addListener("click", function () {
      

        
         
        adresseElt.innerHTML = " " + station.address; // Affiche l'adresse de la station cliquée
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
            btnInsert.disabled = true; // Désactive le bouton Réserver
            divReservation.style.display = "none"; // retire affichage du canvas
           
        } else {
            btnInsert.style.opacity = "1";
            btnInsert.disabled = false; // Active le bouton Réserver
            divReservation.style.display = "block"; // retire affichage du canvas
        }
        sessionStorage.setItem('Adresse', station.address); // Sauvegarde l'addresse de la station
        sessionStorage.getItem("Adresse");
        console.log(sessionStorage.key(1)); // ça affiche Adresse dans la console
    })
   
          markers.push(marker);
      })
      //Regroupement des marqueurs
      const markerCluster = new MarkerClusterer(map, markers,
                                              {imagePath: '../images/m'});

        
  });
}

// La localisation et l'état de chaque station (ouverte, en travaux, 
//combien de vélos et de places sont disponibles, etc.) est fourni via la plateforme OpenData de JC Decaux.

//Un clic sur un marqueur affiche l’état de la station dans un panneau construit en HTML et CSS à côté de la carte. 
// .bindPopup ('<p> Hello world </p>');
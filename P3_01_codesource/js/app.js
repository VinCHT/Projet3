
// let MonInitialisation = new Initialisation(document.getElementById("conclusion"),document.getElementById("formulaire"),document.getElementById("stationInfo"),document.getElementById("blocBas") );
// MonInitialisation.initLancement();


function initMap() {
    MaMap.initCoord(45.757, 4.85, "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=b3f3dffd90d017cc424e6b909d8b33d30b8d61ff");
  }
  


let monCanvas = new Canvas(document.getElementById('canvas'),this.canvas.getContext('2d'),document.querySelector('input[name="penColor"]'),document.querySelector('input[name="penWidth"]'),false,10,10,document.querySelector('#annuler'),document.getElementById('reserver'),false,0,0);
monCanvas.evenement();




let MonSliders = new MonSlider(null,document.getElementById("playPause"),0,document.getElementsByClassName("contenuImages"),document.querySelector(".legende .legendeText"));
MonSliders.setTimer();


// let MonTimer = new Timer(20);
// MonTimer.Decrement();





class Initialisation {
    constructor(conclusionElt,formulaireElt,stationInfo) {
      this.conclusionElt = conclusionElt;
      this.formulaireElt = formulaireElt; 
      this.stationInfo = stationInfo;
      this.blocBas = blocBas;
     
    
   
    }//fin c

    
   initLancement() {

      this.takeLocalData();
      this.conclusionElt.style.display = 'none';
      this.formulaireElt.style.display = 'none'; 
      this.stationInfo.style.display = 'none';
      this.blocBas.style.display="none";
      
   
     
   }
 
   affichage1() {
      this.stationInfo.style.display = 'block';
      this.formulaireElt.style.display = 'block';
    
   }

   takeLocalData() {
   this.init();
   this.onSavePressed();
      
    
   }
   init() {
      
      if (localStorage.Nom && localStorage.Prenom) {
          document.getElementById("inpNom").value = localStorage.Nom;
          document.getElementById("inpPrenom").value = localStorage.Prenom;
      }
    
    }
    
    onSavePressed() {
     
      localStorage.Nom = document.getElementById("inpNom").value;
      localStorage.Prenom = document.getElementById("inpPrenom").value;
    
    }

      

}//fin Classe


let MonInitialisation = new Initialisation(document.getElementById("conclusion"),document.getElementById("formulaire"),document.getElementById("stationInfo"),document.getElementById("blocBas") );

MonInitialisation.initLancement();



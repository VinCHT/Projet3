// // const inpKey = document.getElementById("inpKey");
// // const inpValue = document.getElementById("inpValue");
// // const btnInsert = document.getElementById("btnInsert");
// // const isOutput = document.getElementById("isOutput");


// // btnInsert.onclick = function () {
// //     const key=inpKey.value;
// //     const value=inpValue.value;



// // if ( key && value) {
// //     localStorage.setItem(key, value);
// //     location.reload(); // rafraichir la page quand on a récupéré key et value
// // }

// // };

// // for (let i = 0; i <localStorage.length; i++) {
// //     const key = localStorage.key(i);
// //     const value = localStorage.getItem(key);

// //     isOutput.innerHTML += `Nom: ${key}<br /> Prénom :${value}`
// // }




// // const btnValider = document.getElementById("valider");
// // btnValider.onclick = function () {
   
// //     etatReservation.style.display = 'none';
  
// //     // afficher reservation en cours

// // }
// class Crayon {
//     constructor(x, y , down) {
//         this.x=x;
//         this.y=y,
//         this.down=down
//     }
// }

// let pen = new Crayon (0,0,false);


class Canvas {
    constructor() {
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');
    this.penColor = document.querySelector('input[name="penColor"]');
    this.penWidth = document.querySelector('input[name="penWidth"]');
    this.annuler = document.querySelector('#annuler');
    this.ctx.strokeStyle = '#FFFF00'; // Pour réaliser le contour
    this.ctx.lineJoin = 'round'; //détermine la forme utilisée pour joindre deux segments de ligne où ils se rencontrent.
    this.ctx.lineCap = 'round'; // La propriété lineCap détermine comment les extrêmités de chaque ligne sont dessinées
    this.ctx.lineWidth = 5;

    this.annuler.addEventListener('click', effacer);
    this.canvas.addEventListener('mousedown', penDown);  //L'événement mousedown est déclenché sur un élément lorsqu'un bouton de périphérique de pointage est enfoncé alors que le pointeur se trouve à l'intérieur de l'élément.
    this.canvas.addEventListener('mousemove', draw);
    this.canvas.addEventListener('mouseup', noDown);
    this.canvas.addEventListener('mouseout', noDown);
    
    this.pen= {
        x:x,
        y:y,
        down:down
    }


    }

        noDown() {
        console.log('out');
        this.pen.down = false;
    }
        draw(e) {
            if (!this.pen.down) return;
            this.ctx.lineWidth = this.penWidth.value;
            this.ctx.strokeStyle = this.penColor.value;
            this.ctx.beginPath(); // Appel cette méthode pour créer un nouveau chemin
            this.ctx.moveTo(this.pen.x, this.pen.y); // moveTo () déplace la fenêtre en cours aux coordonnées spécifiées.
            this.ctx.lineTo(e.offsetX, e.offsetY); //Ajoute une ligne droite aux coordonnées (x, y) spécifiées. Mais à tracer avec fill ou stroke

            this.ctx.stroke();
            [this.pen.x, this.pen.y] = [e.offsetX, e.offsetY]; // Provient de MouseEvent.offsetX
        }
        penDown(e) {
            this.pen.down = true;
            [this.pen.x, this.pen.y] = [e.offsetX, e.offsetY];
            console.log(pen);
        }
        effacer() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

}
let Canvas1 = new Canvas;

console.log(Canvas1);
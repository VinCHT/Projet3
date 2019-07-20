class Crayon {
    constructor(x, y , down) {
        this.x=x;
        this.y=y,
        this.down=down
    }
}

let pen = new Crayon (0,0,false);


const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const penColor = document.querySelector('input[name="penColor"]');
const penWidth = document.querySelector('input[name="penWidth"]');
const annuler = document.querySelector('#annuler');
const reserver = document.querySelector('btnInsert');
ctx.strokeStyle = '#000000'; // Pour réaliser le contour
ctx.lineJoin = 'round'; //détermine la forme utilisée pour joindre deux segments de ligne où ils se rencontrent.
ctx.lineCap = 'round'; // La propriété lineCap détermine comment les extrêmités de chaque ligne sont dessinées
ctx.lineWidth = 5;


//reserver.addEventListener ('click', reserver);
//btnInsert.addEventListener('click', secondesEcoulees);
annuler.addEventListener('click', effacer);
canvas.addEventListener('mousedown', penDown);  //L'événement mousedown est déclenché sur un élément lorsqu'un bouton de périphérique de pointage est enfoncé alors que le pointeur se trouve à l'intérieur de l'élément.
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', noDown);
canvas.addEventListener('mouseout', noDown);
function noDown() {
    console.log('out');
    pen.down = false;
}
function draw(e) {
    if (!pen.down) return;
    ctx.lineWidth = penWidth.value;
    ctx.strokeStyle = penColor.value;
    ctx.beginPath(); // Appel cette méthode pour créer un nouveau chemin
    ctx.moveTo(pen.x, pen.y); // moveTo () déplace la fenêtre en cours aux coordonnées spécifiées.
    ctx.lineTo(e.offsetX, e.offsetY); //Ajoute une ligne droite aux coordonnées (x, y) spécifiées. Mais à tracer avec fill ou stroke

    ctx.stroke();
    [pen.x, pen.y] = [e.offsetX, e.offsetY]; // Provient de MouseEvent.offsetX
}
function penDown(e) {
    pen.down = true;
    [pen.x, pen.y] = [e.offsetX, e.offsetY];
    console.log(pen);
}
function effacer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}






  
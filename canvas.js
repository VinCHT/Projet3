
class Canvas {
    constructor(canvas,ctx,penColor,penWidth,down,width,height,annuler,btnReservez, mousePressed ,mouseX, mouseY) {
        this.canvas= canvas,
        this.ctx= ctx,
        this.penColor= penColor,
        this.penWidth= penWidth,
        this.down= down,
        this.width= width,
        this.height= height,
        this.annuler =annuler,
        this.btnReservez=btnReservez,
        this.mousePressed = mousePressed,
		this.mouseX = mouseX,
		this.mouseY = mouseY
     
    }
  
    debutTrait() {
        this.down = true;
  
    }
  
    finTrait() {
        this.down = false;
        this.ctx.beginPath();
    }
  
    draw(e) {
        if(!this.down) return;
        this.ctx.lineWidth = 10;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = this.penWidth.value;
        this.ctx.strokeStyle = this.penColor.value;
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
        this.btnReservez.disabled = false;  
        
    }

    effacer() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.btnReservez.disabled = true;  
    }
 
    evenement() {
        this.canvas.addEventListener("mousedown", this.debutTrait.bind(this));
        this.canvas.addEventListener("mousemove", this.draw.bind(this));
        this.canvas.addEventListener("mouseup", this.finTrait.bind(this));
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        this.canvas.addEventListener('touchend', this.onMouseUp.bind(this), false);
    }
    onTouchMove(event){
        if (this.mousePressed) {
            event.preventDefault();
            this.mouseX = (event.targetTouches[0].pageX) - this.canvas.offsetLeft;
            this.mouseY = (event.targetTouches[0].pageY) - this.canvas.offsetTop;
            this.ctx.lineWidth = this.penWidth.value;
        this.ctx.strokeStyle = this.penColor.value;
            this.ctx.lineTo(this.mouseX, this.mouseY);
            this.ctx.stroke();
            this.btnReservez.disabled = false;  
        }
    }
    
    
    onTouchStart(event){
        this.mousePressed = true;
        this.mouseX = (event.targetTouches[0].pageX) - this.canvas.offsetLeft;
        this.mouseY = (event.targetTouches[0].pageY) - this.canvas.offsetTop;
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouseX, this.mouseY);
    }
  
    onMouseUp(event){
        this.mousePressed = false;
    }
  }
  
//   let monCanvas = new Canvas(document.getElementById('canvas'),this.canvas.getContext('2d'),document.querySelector('input[name="penColor"]'),document.querySelector('input[name="penWidth"]'),false,10,10,document.querySelector('#annuler'),document.getElementById('reserver'),false,0,0);
//   monCanvas.evenement();
  

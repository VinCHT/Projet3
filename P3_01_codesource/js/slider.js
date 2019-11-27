class MonSlider {
	constructor(timer,playPauseBtn,slideIndex,slides,legendeText) {
        this.timer=timer,
        this.playPauseBtn=playPauseBtn,
        this.slideIndex = slideIndex,
        this.slides=slides,
        this.legendeText=legendeText
    
	}

    plusSlides(n) {
        this.moveSlide(this.slideIndex+n);
    }

 
    moveSlide(n){
        let i;
        let current,next;
        const moveSlideAnimClass={
              forCurrent:"",
              forNext:""
        };
        let slideTextAnimClass;

        if( n>this.slideIndex) {
            if( n >= this.slides.length) {
                n=0;
            }
            moveSlideAnimClass.forCurrent="moveLeftCurrentSlide";
            moveSlideAnimClass.forNext="moveLeftNextSlide";
            slideTextAnimClass="slideTextFromTop";

        } else if(n<this.slideIndex) {
            if(n<0) {
                n=this.slides.length-1;
            }
            moveSlideAnimClass.forCurrent="moveRightCurrentSlide";
            moveSlideAnimClass.forNext="moveRightPrevSlide";
            slideTextAnimClass="slideTextFromBottom";
        }
    
        if(n!=this.slideIndex) {
            next = this.slides[n];
            current=this.slides[this.slideIndex];

            for (i = 0; i < this.slides.length; i++) {
                this.slides[i].className = "contenuImages";
                this.slides[i].style.opacity=0;
            
            }
            current.classList.add(moveSlideAnimClass.forCurrent);
            next.classList.add(moveSlideAnimClass.forNext);
            
            this.slideIndex=n;
            this.legendeText.style.display="none";
            this.legendeText.className="legendeText "+slideTextAnimClass;
            this.legendeText.innerText=this.slides[n].querySelector(".legendeText").innerText;
            this.legendeText.style.display="block";
        }
    
    }


    setTimer(){
        this.timer=setInterval(function () {
            MonSliders.plusSlides(1) ;
        },5000);
        document.addEventListener("keydown", function(e){
            if(e.keyCode === 39){
                MonSliders.plusSlides(1);
            }
            else if(e.keyCode === 37){
                MonSliders.plusSlides(-1);
            }
            });	
    
    }
   
    playPauseSlides() {
    
        if(this.timer==null){
            this.setTimer();
            this.playPauseBtn.style.backgroundPositionY="0px"
        }else{
            clearInterval(this.timer);
            this.timer=null;
            this.playPauseBtn.style.backgroundPositionY="-33px"
        }
    }
}


// let MonSliders = new MonSlider(null,document.getElementById("playPause"),0,document.getElementsByClassName("contenuImages"),document.querySelector(".legende .legendeText"));
// MonSliders.setTimer();





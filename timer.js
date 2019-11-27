 
class Timer {
    constructor (mins) {
    this.mins = mins;
    this.secs = mins * 60;
    }

    countdown() { 
        setTimeout('MonTimer.Decrement()', 60); 
        
    } 

    Decrement() { 
        if (document.getElementById) { 
            this.minutes = document.getElementById("minutes"); 
            this.seconds = document.getElementById("seconds"); 
            this.minutes.style.textAlign = "center";
            this.seconds.style.textAlign = "center";
        }

        if (this.seconds < 59) { 
            this.seconds.value = this.secs; 
        } 

        else { 
            this.minutes.value = this.getminutes(); 
            this.seconds.value = this.getseconds(); 
        } 
       
        if (this.mins < 1) { 
            this.minutes.style.color = "black"; 
            this.seconds.style.color = "black"; 
        } 

        if(this.mins < 0) {
            this.minutes.value = 0; 
            this.seconds.value = 0; 
           
        
    }
 
        else { 
            this.secs--; 
            setTimeout('MonTimer.Decrement()', 1000); 
        
        } 
       
         
    } 


    getminutes() { 
        this.mins = Math.floor(this.secs / 60); 
        return this.mins; 
    } 


    getseconds() { 
        return this.secs - Math.round(this.mins * 60); 
    } 

    
    stop() {
        this.mins= 20;
        this.secs=0;
      
    }
   

}


let MonTimer = new Timer(20);



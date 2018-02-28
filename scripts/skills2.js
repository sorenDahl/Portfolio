$(document).ready(function(){
    
        var elem = document.querySelectorAll("#bar");
        var hasAnimated = false;
        var bars = [elem.length]; 
    // Unity, C#, Java, JS, UX, Maya, HTML, CSS, Arduino, Pure Data
        var percentages = [80,60,50,40,60,60,40,40,30,40]; 
      
//---- CLASS FOR EACH BAR WITH FUNCTIONS FOR ANIMATING AND RESETTING ---------//     
        class bar{
            constructor(_elem, percent, speed){
                //var width = 1;
                this.elem = _elem; 
                this.percent = percent; 
                this.speed = speed; 
            }
           Move(_id){
                $(this.elem).animate({width: this.percent+'%'},
                {
                 duration:this.speed*100, 
                    step: function(now, fx){
                        $("#progress"+_id).text(parseInt(now)+'%'); 
                    }
                }).css('-webkit-animation-duration:infinite');
           }

            reset(){
                this.width = 1; 
                this.elem.style.width = 1 + '%'; 
                $("#progress").text(parseInt(1)+'%');
                //this.elem.innerHTML = this.width * 1 + '%';
            }
        }
    // END OF BAR CLASS // 
    
    
    
    //----- INSTANTIATE BARS ------ /// 
    for(var i = 0; i < 10 ; i++){
            var speed = Math.floor((Math.random()*22)+8); 
            bars[i] = new bar(elem[i], percentages[i], speed, i); 
        }

    
    // ---------- CHECKING WHETHER THE BARS ARE IN VIEW BEFORE ANIMATING ------ // 
    function isScrolledIntoView(elem){
        var docViewTop = $(this).scrollTop();
        var elemTop = $(elem).offset().top;
        var windowHeight = window.innerHeight; 
        // var elemBottom = elemTop + $(elem).height();
        //var docViewBottom = docViewTop + $(this).height();
        //var isInView = ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));

        var isInView = (docViewTop+windowHeight >= elemTop); 
        return isInView
    }  
    
    $(document.body).on('touchmove', onScroll); // for mobile
    $(window).on('scroll', onScroll);
    
    function onScroll(){
        var elem = $(document.body.getElementsByClassName("skills-coloumns"))
        
        var docViewTop = $('body').scrollTop();  
        var elemTop = $(elem).offset().top;
        var windowHeight = window.outerHeight;
        console.log(windowHeight); 
        var isInView = (docViewTop+windowHeight >= elemTop);  
        if(isInView && !hasAnimated){
            for(var i = 0; i < bars.length; i++){
                bars[i].Move(i); 
            }
           hasAnimated = true;
        }else if(docViewTop+windowHeight >= elemTop && hasAnimated){
            return; 
        }
        
        else {
            console.log("Not visible"); 
            hasAnimated = false;
            for(var j = 0; j < bars.length; j++){
                bars[j].reset(); 
            }
        }
    };
}); 
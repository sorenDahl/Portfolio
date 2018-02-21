//window.onload = function(){  
    
    
        var elem = document.querySelectorAll("#bar");
        var hasAnimated = false;
        var bars = [8]; 
        var percentages = [80,60,50,40,60,40,40,40]; 
        
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
    
    // Create instances of bars and store in array. 
    for(var i = 0; i < 8; i++){
            var speed = Math.floor((Math.random()*22)+8); 
            bars[i] = new bar(elem[i], percentages[i], speed, i); 
        }

    function isScrolledIntoView(elem){
        var docViewTop = $("body").scrollTop();
        var docViewBottom = docViewTop + $("body").height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        var windowHeight = window.innerHeight; 
        //var isInView = ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));

        var isInView = (docViewTop+windowHeight >= elemTop); 
        return isInView
    }  

    $(window).scroll(function() { 
        var isInView = false;  

        if(isScrolledIntoView($(document.getElementsByClassName("skills-coloumns"))) && !hasAnimated)
        {
            console.log("Is in view");
            for(var i = 0; i < bars.length; i++){
                bars[i].Move(i); 
            }
            hasAnimated = true;

        }else if(isScrolledIntoView($(document.getElementsByClassName("skills-coloumns"))) && hasAnimated){
            return; 
        }
        
        else {
            console.log("Not visible"); 
            hasAnimated = false;

             for(var j = 0; j < bars.length; j++){
               bars[j].reset(); 
            }
        }
    });
//}; 
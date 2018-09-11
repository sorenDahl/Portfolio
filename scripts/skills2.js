$(document).ready(function(){
        var elem = document.querySelectorAll("#bar");
        var hasAnimated = false;
        var bars = [elem.length];
     // Unity, C#, Java, JS, UX, Maya, HTML, CSS, Arduino, Pure Data, python ,AI
        var percentages = [80,70,60,50,50,50,50,50,40,40,40,40]; 
    

    function GetZoomFactor () {
            var factor = 1;
            if (document.body.getBoundingClientRect) {
                    // rect is only in physical pixel size in IE before version 8 
                var rect = document.body.getBoundingClientRect ();
                var physicalW = rect.right - rect.left;
                var logicalW = document.body.offsetWidth;
                rect.top
                factor = Math.round ((physicalW / logicalW) * 100) / 100; 
            }
            return factor;
        }
    
    // ---- Bar Class ------ // 
    function Bar(elem,percent,speed){
        this.elem = elem; 
        this.percent = percent; 
        this.speed = speed; 
        
        
        this.Move = function(_id){
            $(this.elem).animate({width: this.percent+'%'},
                {
                 duration:this.speed*100, 
                    step: function(now, fx){
                        $("#progress"+_id).text(parseInt(now)+'%'); 
                    }
                }).css('-webkit-animation-duration:infinite');
           }
        
        this.Reset = function(){
            this.width = 1; 
            this.elem.style.width = 1 + '%'; 
            $("#progress").text(parseInt(1)+'%');
            //this.elem.innerHTML = this.width * 1 + '%';
        } 
    }
    
    
    //----- INSTANTIATE BARS ------ /// 
    for(var i = 0; i < 12 ; i++){
            var speed = Math.floor((Math.random()*10)+6); 
            bars[i] = new Bar(elem[i], percentages[i], speed); 
        }   
    
    
    $(document.body).on('touchmove', onScroll); // for mobile
    $(window).on('scroll', onScroll);
    
    function onScroll(){
        var skillsElem = document.getElementById("skillsBottom");
        var rect = skillsElem.getBoundingClientRect(); 
        var rectHeight = rect.bottom - rect.top; 
        var rectSumPos = rect.bottom - rectHeight; 
        var isInView = (window.innerHeight >= rect.bottom); 
        if(isInView && !hasAnimated){
            for(var i = 0; i < bars.length; i++){
                bars[i].Move(i); 
            }
           hasAnimated = true;
        }else if(isInView && hasAnimated){
            return; 
        }
        
        else {
            hasAnimated = false;
            for(var j = 0; j < bars.length; j++){
                bars[j].Reset(); 
            }
        }
    };
}); 
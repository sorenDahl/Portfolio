$(document).ready(function(){
    console.log(innerWidth);
    var w = innerWidth; 
    var is_mobile = false; 
    if(innerWidth < 1100){
        console.log("This is a mobile device"); 
        is_mobile = true; 
    } else{
        is_mobile = false; 
        console.log("This is a computer!"); 
    }
    
    // Object with 'hide' class tag are Initially hidden 
    if(is_mobile == true){
        $(".hide").show();
    }else{    
        $(".hide").hide(); 
    }
    
    $(".contactItemLeft img").hover(
    function(){ 
        $('#captionLeft').fadeIn('slow');
    },
    function(){
        $('#captionLeft').fadeOut(300);
    });
    
    $(".contactItemRight img").hover(
    function(){ 
        $('#captionRight').fadeIn('slow');
    },
    function(){
        $('#captionRight').fadeOut(300);    
    });
    
 });
    $(window).resize(function(){
        w=innerWidth; 
        console.log(w); 
        if(w > 1100){
            is_mobile = false; 
            console.log("this is a computer after resizing"); 
            $(".hide").hide();
        }else
            {
            is_mobile = true; 
            console.log("this is a mobile after resizing");
            $(".hide").show();  
        }
    }); 

 
var incX = 0.0178;
var incY = 0.0135; 
var incZ = 0.0001; 
var scl = 20;
var zoff = 0;  
//var start = 0; 
var rows; 
var cols;
var canvasHolder; 
var canvasWidth; 
var canvasHeight; 
var particles =  []; 
var flowfield; 
var colorGrey;
var colorBack;
var particleColor;

// F46CB0 - PINK
// A3D6DA - Light Blue
// 213F91 - Dark blue


function setup() {
    canvasHolder = select('#canvas'); 
    canvasWidth  = canvasHolder.width; 
    canvasHeight = canvasHolder.height;
    particleColor = color('#1F52AD'); 
    //colorBack = color('#FFFFFF'); 
    createCanvas(canvasWidth, canvasHeight).parent('canvas');
    
    cols = floor(canvasWidth / scl); 
    rows = floor(canvasHeight / scl); 
    
    flowfield = new Array(cols*rows);
    
    for(var i = 0; i < 70; i++){
        particles[i] = new Particle(particleColor);
    }
}

function draw(){
    var yoff = 0; 
    for (var y = 0; y < rows; y++){
        var xoff = 0; 
        for(var x = 0; x < cols; x++){
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 2; 
            var v = p5.Vector.fromAngle(angle); 
            v.setMag(1); 
            flowfield[index] = v;  
            xoff += incX;
            stroke(0); 
        }
        yoff += incY; 
        zoff += incZ; 
    } 
    
    for(var i = 0; i < particles.length; i++){
        particles[i].follow(flowfield);
        particles[i].update(); 
        particles[i].edges(); 
        particles[i].show();
        
    }
}

window.onresize = function(){
    console.log("Resize!!");
    canvasWidth = window.width;
    canvasHeight = window.height;
    cols = floor(canvasWidth / scl); 
    rows = floor(canvasHeight / scl); 
    
    flowfield = new Array(cols*rows); 
    for(var i = 0; i < 100; i++){
        particles[i] = new Particle(colorGrey);
    }
    for(var i = 100; i < 500; i++){
        particles[i] = new Particle(colorBack);
    }
}
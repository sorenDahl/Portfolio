 
var inc = 0.01; 
var scl = 14;
var zoff = 0;  
//var start = 0; 
var rows; 
var cols;
var canvasHolder; 
var canvasWidth; 
var canvasHeight; 
var particles =  []; 
var flowfield; 

function setup() {
    canvasHolder = select('#canvas'); 
    canvasWidth  = canvasHolder.width; 
    canvasHeight = canvasHolder.height;
    //console.log(canvasHolder);
  
  
    console.log(canvasWidth + ', ' + canvasHeight);
    createCanvas(canvasWidth, canvasHeight).parent('canvas');
    
    cols = floor(canvasWidth / scl); 
    rows = floor(canvasHeight / scl); 
    flowfield = new Array(cols*rows); 
    for(var i = 0; i < 500; i++){
        particles[i] = new Particle();
    }
    //background(color('#FFF5CB')); 
}

function draw(){
    var yoff = 0; 
    background(color('#FFF5CB')); 
    for (var y = 0; y < rows; y++){
        var xoff = 0; 
        for(var x = 0; x < cols; x++){
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 2; 
            var v = p5.Vector.fromAngle(angle); 
            v.setMag(1); 
            flowfield[index] = v;  
            xoff += inc;
            stroke(0); 
            /*
            push(); 
            translate(x*scl*2.8, y*scl); 
            rotate(v.heading());
            strokeWeight(1); 
            line(0, 0, scl, 0); 
            pop(); */
        }
        yoff += inc; 
        zoff += 0.0003; 
    } 
    
    for(var i = 0; i < particles.length; i++){
        particles[i].follow(flowfield);  
        particles[i].update(); 
        particles[i].edges(); 
        particles[i].show();
        
    }
}
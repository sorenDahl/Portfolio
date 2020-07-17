// Code for: https://youtu.be/BjoM9oKOAKY

function Particle(color) {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.color = color;
  this.maxspeed = 2;
  this.h = 0;
  var inc = 1; 
  var _strokeW = 1.1; 
  var threshHold = 0.08; 

  this.prevPos = this.pos.copy();

  this.update = function() {
      if(this.maxspeed < threshHold)
      {
        return; 
      }else
      {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.maxspeed = lerp(this.maxspeed, 0, 0.005); 
      }
  }

  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    stroke('#1F52AD');
    this.h = this.h + inc;
    strokeWeight(_strokeW);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > window.width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = window.width;
      this.updatePrev();
    }
    if (this.pos.y > window.height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = window.height;
      this.updatePrev();
    }

  }
}


function Particle(max_speed, stroke_weight, rgb){
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxspeed = max_speed;
  this.stroke_weight = stroke_weight;
  this.r = rgb[0];
  this.g = rgb[1];
  this.b = rgb[2];
  this.a = rgb[3];

  this.prevPos = this.pos.copy();

  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.show = function(){
    stroke(this.r, this.g, this.b, this.a);
    strokeWeight(stroke_weight); // how THICCCC a particle is
    //point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    this.updatePrev();
  }

  this.follow = function(flowfield){
    var x = floor(this.pos.x / scl); //find closest column
    var y = floor(this.pos.y / scl); // find closest row
    var index = x + y * cols; // get index of row/col
    var force = flowfield[index];
    this.applyForce(force);
  }

  this.updatePrev = function(){
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function(){
    if(this.pos.x > width){
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.x < 0){
      this.pos.x = width;
      this.updatePrev();
    }
    if(this.pos.y > height){
      this.pos.y = 0;
      this.updatePrev();
    }
    if(this.pos.y < 0){
      this.pos.y = height;
      this.updatePrev();
    }
  }
}

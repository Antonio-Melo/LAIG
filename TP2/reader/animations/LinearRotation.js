/*
FICHEIRO EXTRA
LINEAR ANIMATION WITH ROTATION OVER HIMSELF
*/
function LinearRotation(id,span,points,rotation){
    Animation.call(this,id,span);

    this.points = points;
    this.rotation = rotation*(Math.PI/180);
    this.animationDistances = [];

    var totalAnimationDistance = 0;
    for(var i = 0; i <this.points.length-1;i++){
        var distance = this.calculateDistanceBetween2Points(this.points[i],this.points[i+1]);
        totalAnimationDistance +=distance;
        this.animationDistances.push(distance);
    }

    this.animationVelocity = totalAnimationDistance/span;
    this.animationAngularVelocity = this.rotation/span;
    this.distanceDone = 0;

    this.initialTime;
    this.timeSpent = 0;
    this.currentAnimationControl = 0;
    this.currentAnimationPosition = this.points[0];
    this.currentAnimationAngle = 0;

    this.lastAnimationTime = -1;
};

LinearRotation.prototype = Object.create(Animation.prototype);
LinearRotation.prototype.constructor = LinearRotation;

LinearRotation.prototype.update = function (currTime) {
  var dtime, x, y, z,t;
  if(!this.render) return;

  if(this.timeSpent >= this.span){
    this.finished = true;
    this.render = false;
    return;
  }

  if(this.lastAnimationTime == -1){
    dtime = 0;
    this.initialTime = currTime
  }
  else{
    dtime = (currTime -this.lastAnimationTime)/1000;
    this.timeSpent = (currTime -this.initialTime)/1000;
  }
  this.lastAnimationTime = currTime;

  this.distanceDone  += this.animationVelocity *dtime;
  if(this.distanceDone > this.animationDistances[this.currentAnimationControl]){
    if(this.currentAnimationControl == this.points.length -2){
      this.finished = true;
      return;
    }else{
      this.distanceDone = 0;
      this.currentAnimationControl++;
    }
  }
  this.currentAnimationAngle =this.animationAngularVelocity*this.timeSpent;
  t = this.distanceDone / this.animationDistances[this.currentAnimationControl];
  x = this.points[this.currentAnimationControl+1][0]*t+((1-t)*this.points[this.currentAnimationControl][0]);
  y = this.points[this.currentAnimationControl+1][1]*t+((1-t)*this.points[this.currentAnimationControl][1]);
  z = this.points[this.currentAnimationControl+1][2]*t+((1-t)*this.points[this.currentAnimationControl][2]);

  this.currentAnimationPosition = [x,y,z];
};

LinearRotation.prototype.getAnimationPosition = function () {
    return this.currentAnimationPosition;
};

LinearRotation.prototype.getAnimationAngle = function () {
    return this.currentAnimationAngle;
};
LinearRotation.prototype.calculateDistanceBetween2Points = function (p1,p2) {
    var deltax = p2[0]-p1[0];
    var deltay = p2[1]-p1[1];
    var deltaz = p2[2]-p1[2];

    return Math.sqrt(deltax*deltax+deltay*deltay+deltaz*deltaz);
};

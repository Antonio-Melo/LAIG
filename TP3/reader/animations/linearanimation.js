function LinearAnimation(id,span,points){
    Animation.call(this,id,span);

    this.points = points;
    this.animationDistances = [];

    var totalAnimationDistance = 0;
    for(var i = 0; i <this.points.length-1;i++){
        var distance = this.calculateDistanceBetween2Points(this.points[i],this.points[i+1]);
        totalAnimationDistance +=distance;
        this.animationDistances.push(distance);
    }

    this.animationVelocity = totalAnimationDistance/span;
    this.distanceDone = 0;

    this.initialTime;
    this.timeSpent = 0;
    this.currentAnimationControl = 0;
    this.currentAnimationPosition = this.points[0];
    this.currentAnimationAngle = Math.atan2(-(this.points[1][2]-this.points[0][2]),(this.points[1][0]-this.points[0][0]));

    this.lastAnimationTime = -1;
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.update = function (currTime) {
  var dtime, x, y, z,t;
  if(!this.render) return;

  if(this.timeSpent >= this.span){
    this.finished = true;
    this.render = false;
    return;
  }

  if(this.lastAnimationTime == -1){
    dtime = 0;
    this.initialTime = currTime;
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
      this.currentAnimationAngle = Math.atan2 (-(this.points[this.currentAnimationControl+1][2]-this.points[this.currentAnimationControl][2]),
                                              (this.points[this.currentAnimationControl+1][0]-this.points[this.currentAnimationControl][0]));
    }
  }

  t = this.distanceDone / this.animationDistances[this.currentAnimationControl];
  x = this.points[this.currentAnimationControl+1][0]*t+((1-t)*this.points[this.currentAnimationControl][0]);
  y = this.points[this.currentAnimationControl+1][1]*t+((1-t)*this.points[this.currentAnimationControl][1]);
  z = this.points[this.currentAnimationControl+1][2]*t+((1-t)*this.points[this.currentAnimationControl][2]);

  this.currentAnimationPosition = [x,y,z];
};

LinearAnimation.prototype.getAnimationPosition = function () {
    return this.currentAnimationPosition;
};

LinearAnimation.prototype.getAnimationAngle = function () {
    return this.currentAnimationAngle;
};
LinearAnimation.prototype.calculateDistanceBetween2Points = function (p1,p2) {
    var deltax = p2[0]-p1[0];
    var deltay = p2[1]-p1[1];
    var deltaz = p2[2]-p1[2];

    return Math.sqrt(deltax*deltax+deltay*deltay+deltaz*deltaz);
};

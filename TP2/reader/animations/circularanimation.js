function CircularAnimation(id,span,centerx,centery,centerz,radius,startang,rotang){
    Animation.call(this,id,span);

    this.centerx = centerx;
    this.centery = centery;
    this.centerz = centerz;
    this.radius = radius;
    this.startang = startang*(Math.PI/180); //Perceber porque é que tenho que adicionar Pi/2
    this.rotang = rotang*Math.PI/180;

    this.animationAngularVelocity = this.rotang/this.span;

    this.currentAnimationPosition = [this.centerx + this.radius * -Math.cos(this.startang),
                                    this.centery,
                                    this.centerz + this.radius * -Math.sin(this.startang)];

    this.initialTime = 0;
    this.currentAnimationAngle = this.startang;
    this.lastAnimationTime = -1;
};


CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.update = function (currTime) {
  var x,y,z;

  if(!this.render) return;

  if(this.initialTime >= this.span){
      this.finished = true;
      this.render = false;
      return;
  }

  if(this.lastAnimationTime !=-1)
    this.initialTime += (currTime-this.lastAnimationTime)/1000;
  else this.lastAnimationTime = currTime;

  this.currentAnimationAngle = this.animationAngularVelocity*this.initialTime +this.startang;
  x = this.centerx+this.radius *-Math.sin(this.currentAnimationAngle);
  y = this.centery;
  z = this.centerz + this.radius *Math.cos(this.currentAnimationAngle);

  this.currentAnimationPosition = [x,y,z];
};

CircularAnimation.prototype.getAnimationPosition = function () {
    return this.currentAnimationPosition;
};

CircularAnimation.prototype.getAnimationAngle = function () {
    return this.currentAnimationAngle;
};

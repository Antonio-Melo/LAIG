function CircularAnimation(id,span,centerx,centery,centerz,radius,startang,rotang){
    Animation.call(this,id,span);

    this.centerx = centerx;
    this.centery = centery;
    this.centerz = centerz;
    this.radius = radius;
    this.startang = startang*Math.PI/180; //Perceber porque é que tenho que adicionar Pi/2
    this.rotang = rotang*Math.PI/180;

    this.animationAngularVelocity = this.rotang/this.span;

    this.currentAnimationPosition = [this.centerx + this.radius * Math.sin(this.startang),
                                    this.centery,
                                    this.centerz + this.radius * Math.cos(this.startang)];

    this.timeElapsed = 0; //why?                                
    this.currentAnimationAngle = this.startang;
    this.lastAnimationTime = -1;
};


CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.update = function () {
//TODO
};

CircularAnimation.prototype.getAnimationPosition = function () {
    return this.currentAnimationPosition;
};

CircularAnimation.prototype.getAnimationAngle = function () {
    return this.currentAnimationAngle;
};

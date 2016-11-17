function CircularAnimation(id,span,centerx,centery,centerz,radius,startang,rotang){
    Animation.call(this,id,span);

    this.centerx = centerx;
    this.centery = centery;
    this.centerz = centerz;
    this.radius = radius;
    this.startang = startang*Math.PI/180;
    this.rotang = rotang*Math.PI/180;
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;
